import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { replyMessage, pushMessage, broadcastMessage } from "./lib/line";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/webhook", async (req: Request, res: Response) => {
	const events = req.body.events;
	if (!Array.isArray(events)) return res.sendStatus(200);

	for (const event of events) {
		if (event.type === "message" && event.message.type === "text") {
			const userId = event.source?.userId;
			const text = event.message.text;
			const replyToken = event.replyToken;

			console.log(`📨 Message from ${userId}: ${text}`);

			// ตอบกลับผู้ใช้
			replyMessage(replyToken, `คุณพิมพ์ว่า: ${text}`);
		}
	}

	res.sendStatus(200);
});

// GET /push?userId=xxx&text=Hello
app.get("/push", async (req: Request, res: Response) => {
	const { userId, text } = req.query;

	if (!userId || !text) {
		return res.status(400).json({ error: "Missing userId or text" });
	}

	await pushMessage(String(userId), String(text));
	res.json({ status: "pushed", to: userId, message: text });
});

// GET /broadcast?text=HelloWorld
app.get("/broadcast", async (req: Request, res: Response) => {
	const { text } = req.query;

	if (!text) {
		return res.status(400).json({ error: "Missing text" });
	}

	console.log(text);

	await broadcastMessage(String(text));
	res.json({ status: "broadcast sent", message: text });
});

app.listen(PORT, () => {
	console.log(`Webhook running at http://localhost:${PORT}/webhook`);
});
