const io = require("socket.io")(8900, {
	cors: {
		origin: "http://localhost:3000",
	},
});
let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
	//when connect
	console.log("user connect");

	// take userId and socketId from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		io.emit("getUsers", users);
	});

	//send and get messages

	//when disconnect
	socket.on("disconnect", () => {
		console.log("user disconnect");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});
