const express = require("express");
const {
  allMessages,
  sendMessage,
  sendMessageFromClinic,
} = require("../controller/MessageController");
const { protect } = require("../middleware/AuthenticationHandler");

const router = express.Router();

router.route("/allMessages/:chatId").get(protect, allMessages);
router.route("/sendMessage").post(protect, sendMessage);
router.route("/sendMessageFromClinic").post(sendMessageFromClinic) // cannot protect as it is accessed by pharmacy users

module.exports = router;
