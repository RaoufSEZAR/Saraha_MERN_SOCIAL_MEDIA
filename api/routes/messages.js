const router = require("express").Router();
const Message = require("../models/Message");

// new a Message
router.post("/", async (req, res, next) => {
	const newMessage = new Message(req.body);
	try {
		const savedMessage = await newMessage.save();
		res.status(201).json(savedMessage);
	} catch (error) {
		res.status(500).json(error);
	}
});
// get a conversation of a user

router.get("/:conversationId", async (req, res, next) => {
	try {
		const messages = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json(error);
	}
});
module.exports = router;
