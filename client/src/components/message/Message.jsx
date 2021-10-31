import React from "react";
import "./message.css";

export default function Message({ own }) {
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<img
					className="messageImg"
					src="https://www.skittles.school/wp-content/uploads/2019/07/Study-Girl-Alone.jpg"
					alt=""
				/>
				<p className="messageText">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				</p>
			</div>
			<div className="messageBottom">1 hour ago</div>
		</div>
	);
}
