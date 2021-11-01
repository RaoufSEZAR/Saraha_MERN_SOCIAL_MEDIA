const router = require("express").Router();
const Conversation = require("../models/Conversation");

// new a conversation
router.post("/", async (req, res, next) => {
	const { senderId, receiverId } = req.body;

	const newConversation = new Conversation({
		members: [senderId, receiverId],
	});
	try {
		const savedConversation = await newConversation.save();
		res.status(201).json(savedConversation);
	} catch (error) {
		res.status(500).json(error);
	}
});
// get a conversation of a user

router.get("/:userId", async (req, res, next) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.params.userId] },
		});
		res.status(200).json(conversation);
	} catch (error) {
		res.status(500).json(error);
	}
});

// geta conve include two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res, next) => {
	try {
		const conversation = await Conversation.findOne({
			members: { $all: [req.params.firstUserId, req.params.secondUserId] },
		});
		res.status(200).json(conversation);
	} catch (error) {
		res.status(500).json(error);
	}
});
module.exports = router;
