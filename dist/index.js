"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const line_1 = require("./line");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.post("/webhook", async (req, res) => {
    const events = req.body.events;
    if (!Array.isArray(events))
        return res.sendStatus(200);
    for (const event of events) {
        if (event.type === "message" && event.message.type === "text") {
            const userId = event.source?.userId;
            const text = event.message.text;
            const replyToken = event.replyToken;
            console.log(`📨 Message from ${userId}: ${text}`);
            // ตอบกลับผู้ใช้
            (0, line_1.replyMessage)(replyToken, `คุณพิมพ์ว่า: ${text}`);
        }
    }
    res.sendStatus(200);
});
// GET /push?userId=xxx&text=Hello
app.get("/push", async (req, res) => {
    const { userId, text } = req.query;
    if (!userId || !text) {
        return res.status(400).json({ error: "Missing userId or text" });
    }
    await (0, line_1.pushMessage)(String(userId), String(text));
    res.json({ status: "pushed", to: userId, message: text });
});
// GET /broadcast?text=HelloWorld
app.get("/broadcast", async (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: "Missing text" });
    }
    await (0, line_1.broadcastMessage)(String(text));
    res.json({ status: "broadcast sent", message: text });
});
app.listen(PORT, () => {
    console.log(`Webhook running at http://localhost:${PORT}/webhook`);
});
