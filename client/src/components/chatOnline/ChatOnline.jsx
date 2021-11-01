/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./chatOnline.css";
import axios from "axios";

export default function ChatOnline({ onlineUsers, setCurrentChat, currentId }) {
	const [friends, setFriends] = useState([]);
	const [onlineFriends, setOnlineFriends] = useState([]);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const handleClick = async (user) => {
		try {
			const res = await axios.get(
				`/conversations/find/${currentId}/${user._id}`
			);
			setCurrentChat(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const getFriends = async () => {
			const res = await axios.get(`/users/friends/${currentId}`);
			setFriends(res.data);
		};

		getFriends();
	}, [currentId]);

	useEffect(() => {
		setOnlineFriends(friends.filter((f) => onlineFriends.includes(f._id)));
	}, [friends, onlineFriends]);

	return (
		<div className="chatOnline">
			{onlineFriends.map((friend) => (
				<div className="chatOnlineFriend" onClick={() => handleClick(friend)}>
					<div className="chatOnlineImgContainer">
						<img
							className="chatOnlineImg"
							src={
								friend?.profilePicture
									? PF + friend.profilePicture
									: PF + "person/noAvatar.png"
							}
							alt=""
						/>
						<div className="chatOnlineBadge"></div>
					</div>
					<span className="chatOnlineName">{friend.username}</span>
				</div>
			))}
		</div>
	);
}
