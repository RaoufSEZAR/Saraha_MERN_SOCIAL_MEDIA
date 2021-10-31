/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import "./messenger.css";
import Topbar from "./../../components/topbar/Topbar";
import Conversation from "./../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "./../../components/chatOnline/ChatOnline";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";

export default function Messenger() {
	const [conversations, setConversations] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const getConversation = async () => {
			try {
				const res = await axios.get(`/conversations/${user._id}`);
				setConversations(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getConversation();
	}, [user._id]);
	return (
		<>
			<Topbar />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input className="chatMenuInput" placeholder="Search for friends" />
						{conversations.map((conv) => (
							<Conversation
								conversation={conv}
								currentUser={user}
								key={conv._id}
							/>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						<div className="chatBoxTop">
							<Message />
							<Message own={true} />
							<Message /> <Message own={true} />
							<Message /> <Message own={true} />
							<Message /> <Message own={true} />
							<Message /> <Message own={true} />
							<Message /> <Message own={true} />
							<Message /> <Message own={true} />
							<Message /> <Message own={true} />
							<Message />
						</div>
						<div className="chatBoxBottom">
							<textarea
								className="ChatMessageInput"
								placeholder="Write something"
							></textarea>
							<button className="chatSubmitButton">Send</button>
						</div>
					</div>
				</div>
				<div className="chatOnline">
					<div className="chatOnlineWrapper">
						<ChatOnline />
						<ChatOnline />
						<ChatOnline />
					</div>
				</div>
			</div>
		</>
	);
}
