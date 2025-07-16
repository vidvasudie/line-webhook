import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const LINE_API_URL = "https://api.line.me/v2/bot/message";
const TOKEN = process.env.CHANNEL_ACCESS_TOKEN;

const headers = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${TOKEN}`,
};

// ฟังก์ชันตอบกลับข้อความ
export async function replyMessage(replyToken: string, text: string) {
	try {
		await axios.post(
			`${LINE_API_URL}/reply`,
			{
				replyToken,
				messages: [{ type: "text", text }],
			},
			{ headers }
		);
	} catch (error) {
		console.error("❌ Error replying:", error);
	}
}

// ฟังก์ชัน push ข้อความหา user
export async function pushMessage(userId: string, text: string) {
	try {
		console.log(`${LINE_API_URL}/push`);
		console.log(`headers: ${JSON.stringify(headers)}`);
		await axios.post(
			`${LINE_API_URL}/push`,
			{
				to: userId,
				messages: [{ type: "text", text }],
			},
			{ headers }
		);
	} catch (error) {
		console.error("❌ Error pushing message:", error);
	}
}

// ส่งข้อความแบบ Broadcast
export async function broadcastMessage(text: string) {
	try {
		console.log(`${LINE_API_URL}/broadcast`);
		console.log(`headers: ${JSON.stringify(headers)}`);
		await axios.post(
			`${LINE_API_URL}/broadcast`,
			{
				messages: [{ type: "text", text }],
			},
			{ headers }
		);
		console.log("📢 Broadcast sent");
	} catch (error) {
		console.error("❌ Error broadcasting message:", error);
	}
}
