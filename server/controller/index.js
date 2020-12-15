const User = require("../models/User");
const Group = require("../models/Group");
const Event = require("../models/Event");
const Comment = require("../models/Comment");
const { firebase, admin } = require("../firebase/firebase");
const { response, json } = require("express");
const { fetchAll } = require("../models/User");
const nodemailer = require("nodemailer");
const credentials = require("../mailCredentials");
// const senderEmail = require("../mailCredentials");
// const senderPassword = require("../mailCredentials");
// create a new user - register
const createNewUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          if (firstName && lastName && email) {
            User.where({ email: email })
              .fetchAll({ withRelated: ["users"] })
              .then((users) => {
                if (users.length > 0) {
                  res.json("this user is already in use");
                } else {
                  new User({ firstName, lastName, email })
                    .save()
                    .then((user) => res.json({ user: user, token: idToken }));
                }
              });
          } else {
            res.json({ error: "please fill all the required fileds" });
          }
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      res.status(errorCode).json(errorMessage);
    });
};

//  signin a user
const signin = (req, res) => {
  const { email, password } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          if (email) {
            User.where({ email: email })
              .fetchAll({ withRelated: ["groups"] })
              .then((user) => {
                // if (user.length > 0) {
                res.json({ user: user, token: idToken });
                // } else {
                //   res.json("no such user");
                // }
              })
              .catch((error) => {
                res.json(error);
              });
          }
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    })
    .catch(function (error) {
      res.status(400).json("Unsuccesful registration. error: " + error);
    });
};

// middleware for firebase

const firebaseMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    var user = firebase.auth().currentUser;
    if (user) {
      // let checkRevoked = true;
      admin
        .auth()
        .verifyIdToken(token)
        .then(function (decodedToken) {
          if (decodedToken.uid === user.uid) {
            req.user = user.uid;
            return next();
          }
        })
        .catch(function (error) {
          // if (error.code == 'auth/id-token-revoked') {
          //     res.send( "Token has been revoked. Reauthenticate or signOut() the user.")
          //   } else {
          //     res.send("Token is invalid.")
          //   }
          res.status(500).json(error);
        });
    } else {
      console.log("There is no current user.");
      res.status(401).json();
    }
  } catch (e) {
    console.log(e);
    res.status(401).send("Unauthorized");
  }
};

// create event
const newEvent = (req, res) => {
  let { title, start, end, userId } = req.body;
  start = new Date(start);
  end = new Date(end);
  if (title) {
    new Event({ title, start, end, userId })
      .save()
      .then((model) => res.json(model));
  } else {
    res.json({ error: "please enter a name" });
  }
};

// load all events by userid
const getEventsByUserId = (req, res) => {
  Event.where({ userId: req.params.userId })
    .fetchAll({ withRelated: ["users"] })
    .then((event) => {
      console.log(event);
      res.json(event);
    });
};

// create a group
const newGroup = (req, res) => {
  const { name, description, userId } = req.body;
  if (name && description) {
    new Group({ name, description })
      .save()
      .then((group) => {
        User.where({ id: userId })
          .save({ groupId: group.id }, { patch: true })
          .then((user) => {
            res.json({ group, user });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    res.json({ error: "please enter a name and description" });
  }
};

// add user to group
// sora elicox

// get all members of a group
const getAllGroupMembersByGroupId = (req, res) => {
  User.where({ groupId: req.params.groupId })
    .fetchAll({ withRelated: ["groups"] })
    .then((members) => {
      console.log(members);
      res.json(members);
    });
};

// create a new comment to an event with event id and user id
const newComment = (req, res) => {
  const { commentContent, ownerId, ownerName } = req.body;
  const { eventId } = req.params;
  const commentDate = new Date();
  const likeCount = 0;
  if (commentContent && ownerId && eventId && ownerName) {
    new Comment({
      commentDate,
      commentContent,
      likeCount,
      ownerName,
      ownerId,
      eventId,
    })
      .save()
      .then((model) => res.json(model));
  } else {
    res.json({ error: "please enter a name" });
  }
};

// get all comments with event id
const getAllCommentsByEventId = (req, res) => {
  Comment.where({ eventId: req.params.eventId })
    .fetchAll({ withRelated: ["events"] })
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    });
};

// get all events with event id
const getEventById = (req, res) => {
  Event.where({ id: req.params.id })
    .fetchAll({ withRelated: ["users"] })
    .then((event) => {
      res.json(event);
    })
    .catch((error) => {
      console.log(error);
    });
};

// getting all groups details by group id
const getGroupDetailsByGroupId = (req, res) => {
  Group.where({ id: req.params.id })
    .fetchAll()
    .then((group) => {
      res.json(group);
    })
    .catch((error) => {
      console.log(error);
    });
};

// adding a registered friend to the group or inviting to the group
const inviteFriend = (req, res) => {
  const { email, userName, groupId } = req.body;
  User.where({ email: email })
    .fetchAll({ withRelated: ["groups"] })
    .then((user) => {
      if (user.length) {
        User.where({ email: email })
          .save({ groupId: groupId }, { patch: true })
          .then((response) => {
            res.json(response);
          });
      } else {
        sendEmail(email, userName);
        res.json("Your invitation has been sent to your friend");
      }
    });

  // sending invitation email to the gmail of the friend
  const sendEmail = (email, userName) => {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      service: "gmail",
      auth: {
        user: credentials.senderEmail,
        pass: credentials.password,
      },
    });

    const mailOptions = {
      from: "info@friendship.com", // sender address
      to: email, // list of receivers
      subject: "Join the FriendShip", // Subject line
      html: userName + " wants you to join the FriendShip", // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  };
};

const getUsersById = (req, res) => {
  User.where({ id: req.params.id })
    .fetchAll({ withRelated: ["users"] })
    .then((user) => {
      res.json(user);
    });
};

//  ==========================================
// demo controllers
// get array of all authors
const getAuthors = (req, res) => {
  Author.fetchAll({ withRelated: ["books"] }).then((authors) => {
    res.json(authors.toJSON({ omitPivot: true }));
  });
};

// get single author by id url param
const getAuthorById = (req, res) => {
  Author.where({ id: req.params.id })
    .fetchAll({ withRelated: ["books"] })
    .then((author) => {
      res.json(author.toJSON({ omitPivot: true }));
    });
};

// post new author
const newAuthor = (req, res) => {
  const { name, bio } = req.body;
  if (name) {
    new Author({ name }).save().then((model) => res.json(model));
  } else {
    res.json({ error: "please enter a name" });
  }
};

// get all books
const getBooks = (req, res) => {
  Book.fetchAll({ withRelated: ["authors", "reviews"] }).then((books) => {
    res.json(books.toJSON({ omitPivot: true }));
  });
};

// get single book by id url param
const getBookById = (req, res) => {
  Book.where({ id: req.params.id })
    .fetchAll({ withRelated: ["authors"] })
    .then((author) => {
      res.json(author.toJSON({ omitPivot: true }).shift());
    });
};

// get all reviews
const getReviews = (req, res) => {
  Review.fetchAll().then((reviews) => {
    res.json(reviews);
  });
};

// get single review by id url param
const getReviewById = (req, res) => {
  Review.where({ id: req.params.id })
    .fetchAll({ withRelated: ["books"] })
    .then((review) => {
      res.json(review.toJSON({ omitPivot: true }).shift());
    });
};

// export functions
module.exports = {
  getEventsByUserId,
  newGroup,
  newEvent,
  getAllGroupMembersByGroupId,
  newComment,
  getAllCommentsByEventId,
  createNewUser,
  signin,
  firebaseMiddleware,
  getEventById,
  getGroupDetailsByGroupId,
  inviteFriend,
  getUsersById,
};
