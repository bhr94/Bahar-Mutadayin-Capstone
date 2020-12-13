const express = require("express");
const controller = require("../controller");
const router = express.Router();

// Event Routes
router.route("/events").post(controller.newEvent);
router.route("/events/:userId").get(controller.getEventsByUserId);

// User Routes
router.route("/users/register").post(controller.createNewUser);
router.route("/users/login").post(controller.signin)
router.route("/users/:groupId").get(controller.getAllGroupMembersByGroupId);

//  Group Routes
router.route("/groups").post(controller.newGroup);


// Comment Routes
router.route("/newComment").post(controller.newComment);
router.route('/comments/:eventId').get(controller.getAllCommentsByEventId);

module.exports = router;
