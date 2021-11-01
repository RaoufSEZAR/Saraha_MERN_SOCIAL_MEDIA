/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useRef } from "react";
import "./messenger.css";
import Topbar from "./../../components/topbar/Topbar";
import Conversation from "./../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "./../../components/chatOnline/ChatOnline";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessages, setNewMessages] = useState("");
	const [arrivalMessages, setArrivalMessages] = useState(null);
	const socket = useRef();

	const { user } = useContext(AuthContext);
	const scrollRef = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", (data) => {
			setArrivalMessages({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessages &&
			currentChat?.members.includes(arrivalMessages.sender) &&
			setMessages((prev) => [...prev, arrivalMessages]);
	}, [arrivalMessages, currentChat]);
	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
			console.log(users);
		});
	}, [user]);

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
		const receiverId = currentChat.members.find(
			(member) => member !== user._id
		);
		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessages,
		});
		try {
			const res = await axios.post("/messages", message);
			setMessages([...messages, res.data]);
			setNewMessages("");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
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
										<div className="" ref={scrollRef} key={m._id}>
											<Message
												key={m._id}
												message={m}
												own={m.sender === user._id}
											/>
										</div>
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
