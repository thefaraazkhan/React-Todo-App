const { addMessage, getMessages } = require("../../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

module.exports = router;
// app.use("/api/messages/addmsg", messageRoute);
// app.use("/api/messages/getmsg", recieveMessageRoute);