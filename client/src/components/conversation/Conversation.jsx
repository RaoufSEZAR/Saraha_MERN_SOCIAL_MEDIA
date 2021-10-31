import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		const friendId = conversation.members.find(
			(member) => member !== currentUser._id
		);
		const getUser = async () => {
			try {
				const res = await axios.get(`/users?userId=${friendId}`);
				setUser(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
	}, [conversation, currentUser]);
	return (
		<div className="conversation">
			<img
				className="conversationImg"
				src={
					user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"
				}
				alt=""
			/>
			<span className="conversationName">{user.username}</span>
		</div>
	);
}
