const express = require("express");
const controller = require("../controller");
const router = express.Router();

// Event Routes
router.route("/events").post(controller.newEvent);
router.route("/events/:userId").get(controller.getEventsByUserId);
router.route("/eventsbyId/:id").get(controller.getEventById);

// User Routes
router.route("/users/register").post(controller.createNewUser);
router.route("/users/login").post(controller.signin)
router.route("/users/:groupId").get(controller.getAllGroupMembersByGroupId);
router.route("/usersById/:id").get(controller.getUsersById)

//  Group Routes
router.route("/groups").post(controller.newGroup);
router.route("/groups/:id").get(controller.getGroupDetailsByGroupId)
router.route("/groups/inviteFriend").post(controller.inviteFriend)

// Comment Routes
router.route("/newComment/:eventId").post(controller.newComment);
router.route('/comments/:eventId').get(controller.getAllCommentsByEventId);

module.exports = router;
