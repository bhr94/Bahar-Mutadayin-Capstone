const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { firebase, admin } = require("../firebase/firebase");
const nodemailer = require("nodemailer");
const credentials = require("../mailCredentials");
// create a new user - register
const createNewUser = async (req, res) => {
  const { firstName, lastName, email, password, invitationCode } = req.body;

  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async function () {
      console.log("created user with email: " + email);
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(async function (idToken) {
          if (firstName && lastName && email) {
            const user = await prisma.user.findMany({
              where: {
                email: email,
                status: "active",
              },
            });
            if (user.length) {
              res.json("this user is already in use");
            } else if (invitationCode.length) {
              //   const invitation = await prisma.invitation.findUnique({
              //     where: { invitationCode: invitationCode },
              //   });

              const user = await prisma.user.findUnique({
                where: {
                  email: email,
                },
              });
              res.json({ user: user, token: idToken });
            } else {
              const user = await prisma.user.create({
                data: { firstName, lastName, email, status: "active" },
              });
              res.json(user);
            }
          } else {
            res.json({ error: "please fill all the required fileds" });
          }
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          res.status(errorCode).json(errorMessage);
        });
    });
};

//  signin a user
const signin = async (req, res) => {
  const { email, password } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(async function (idToken) {
          if (email) {
            const user = await prisma.user.findUnique({
              where: {
                email: email,
              },
            });
            res.json({ user: user, token: idToken });
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

// firebase middleware
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

// create a new event
const newEvent = async (req, res) => {
  let { title, start, end, userId } = req.body;
  start = new Date(start);
  end = new Date(end);
  if (title) {
    const result = await prisma.event.create({
      data: { title, start, end, userId },
    });
    res.json(result);
  } else {
    res.json({ error: "please enter a name" });
  }
};

// load all events by userid
const getEventsByUserId = async (req, res) => {
  let id = parseInt(req.params.userId);
  const events = await prisma.event.findMany({
    where: { userId: id },
  });
  res.json(events);
};

// create a group
const newGroup = async (req, res) => {
  const { name, description, userId } = req.body;
  if (name && description) {
    const group = await prisma.group.create({
      data: {
        name,
        description,
      },
    });
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        groupId: group.id,
      },
    });

    res.json({ group, user });
  } else {
    res.json("please enter a name and description");
  }
};

// get all members of a group
const getAllGroupMembersByGroupId = async (req, res) => {
  const members = await prisma.user.findMany({
    where: { groupId: parseInt(req.params.groupId) },
  });
  res.json(members);
};

// create a new comment to an event with event id and user id
const newComment = async (req, res) => {
  const { commentContent, ownerId, ownerName } = req.body;
  const { eventId } = req.params;
  const commentDate = new Date();
  const likeCount = 0;
  if (commentContent && ownerId && eventId && ownerName) {
    const comment = await prisma.comment.create({
      data: {
        commentDate,
        commentContent,
        likeCount,
        ownerName,
        eventId: parseInt(eventId),
        ownerId: parseInt(ownerId),
      },
    });
    res.json(comment);
  } else {
    res.json({ error: "please enter a name" });
  }
};

// get all comments with event id
const getAllCommentsByEventId = async (req, res) => {
  const allcomments = await prisma.comment.findMany({
    where: {
      eventId: parseInt(req.params.eventId),
    },
  });

  res.json(allcomments);
};

// get all events with event id
const getEventById = async (req, res) => {
  let id = parseInt(req.params.id);
  const events = await prisma.event.findMany({
    where: {
      id: id,
    },
  });
  res.json(events);
};

// getting all groups details by group id
const getGroupDetailsByGroupId = async (req, res) => {
  const details = await prisma.group.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(details);
};

// sending invitation email to the gmail of the friend
const sendEmail = async (email, userName, code) => {
    transporter =  nodemailer.createTransport({
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
      html: `${userName} invites you to the FriendShip platform https://friend-ship.netlify.app/. Here is the invitation code: ${code}`, // plain text body
    };

    await transporter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  };



// adding a registered friend to the group or inviting to the group
const inviteFriend = async (req, res) => {
  const {
    email,
    userName,
    groupId,
    firstName,
    lastName,
    invitationCode,
  } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);
  if (user) {
    const newUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        groupId: groupId,
        status: "active",
      },
    });
    res.json(newUser);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        status: "pending",
        groupId: parseInt(groupId),
      },
    });
    const invitation = await prisma.invitation.create({
      data: {
        invitationCode: invitationCode,
        invitedEmail: email,
        groupId: parseInt(groupId),
      },
    });
    await sendEmail(email, userName, invitationCode);
    res.json({
      message: "Your invitation has been sent to your friend",
      user: newUser,
    });
  }
}

  

// getting user by userid
const getUsersById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(user);
};

const addMessage = async (req, res) =>{
    console.log(req.body)
}

module.exports = {
  createNewUser,
  signin,
  newEvent,
  getEventsByUserId,
  newGroup,
  getAllGroupMembersByGroupId,
  newComment,
  getAllCommentsByEventId,
  getEventById,
  getGroupDetailsByGroupId,
  getUsersById,
  firebaseMiddleware,
  inviteFriend,
  addMessage
};
