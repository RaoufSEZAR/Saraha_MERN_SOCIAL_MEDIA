import React from "react";
import "./chatOnline.css";

export default function ChatOnline() {
	return (
		<div className="chatOnline">
			<div className="chatOnlineFriend">
				<div className="chatOnlineImgContainer">
					<img
						className="chatOnlineImg"
						src="https://www.skittles.school/wp-content/uploads/2019/07/Study-Girl-Alone.jpg"
						alt=""
					/>
					<div className="chatOnlineBadge"></div>
				</div>
				<span className="chatOnlineName">Raouf Satto</span>
			</div>
		</div>
	);
}
