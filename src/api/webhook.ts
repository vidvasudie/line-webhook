import type { VercelRequest, VercelResponse } from "@vercel/node";
import { replyMessage, pushMessage, broadcastMessage } from "../lib/line";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== "POST") {
		return res.status(405).send("Method Not Allowed");
	}

	const events = req.body.events;

	if (!Array.isArray(events))
		return res.status(400).json({ error: "Invalid event format" });

	for (const event of events) {
		if (event.type === "message" && event.message.type === "text") {
			const text = event.message.text;
			const replyToken = event.replyToken;
			const userId = event.source?.userId;

			replyMessage(replyToken, `คุณพิมพ์ว่า: ${text}`);
		}
	}

	res.status(200).json({ status: "ok" });
}
