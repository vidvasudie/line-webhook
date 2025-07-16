import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pushMessage } from "../lib/line";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { userId, text } = req.query;

	if (!userId || !text) {
		return res.status(400).json({ error: "Missing userId or text" });
	}

	try {
		await pushMessage(String(userId), String(text));
		res.json({ status: "pushed", to: userId, message: text });
	} catch (error: any) {
		res.status(500).json({ error: error?.response?.data || error.message });
	}
}
