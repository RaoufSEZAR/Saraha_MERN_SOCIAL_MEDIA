/* eslint-disable no-unused-vars */
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
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessages, setNewMessages] = useState("");
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

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get(`/messages/${currentChat?._id}`);
				setMessages(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getMessages();
	}, [currentChat]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessages,
			conversationId: currentChat._id,
		};
		try {
			const res = await axios.post("/messages", message);
			setMessages([...messages, res.data]);
			setNewMessages("");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Topbar />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input className="chatMenuInput" placeholder="Search for friends" />
						{conversations.map((conv) => (
							<div
								className=""
								key={conv._id}
								onClick={() => setCurrentChat(conv)}
							>
								<Conversation
									conversation={conv}
									currentUser={user}
									key={conv._id}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<>
								<div className="chatBoxTop">
									{messages.map((m) => (
										<Message
											key={m._id}
											message={m}
											own={m.sender === user._id}
										/>
									))}
								</div>
								<div className="chatBoxBottom">
									<textarea
										className="ChatMessageInput"
										placeholder="Write something"
										value={newMessages}
										onChange={(e) => setNewMessages(e.target.value)}
									></textarea>
									<button className="chatSubmitButton" onClick={handleSubmit}>
										Send
									</button>
								</div>
							</>
						) : (
							<span className="noConversationText">
								Open a conversation to start a chat
							</span>
						)}
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
