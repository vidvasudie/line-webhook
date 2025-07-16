import type { VercelRequest, VercelResponse } from "@vercel/node";
import { broadcastMessage } from "../lib/line";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { text } = req.query;

	if (!text) return res.status(400).json({ error: "Missing text" });

	try {
		await broadcastMessage(String(text));
		res.json({ status: "broadcast sent", message: text });
	} catch (error: any) {
		res.status(500).json({ error: error?.response?.data || error.message });
	}
}
