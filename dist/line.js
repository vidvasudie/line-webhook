"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyMessage = replyMessage;
exports.pushMessage = pushMessage;
exports.broadcastMessage = broadcastMessage;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LINE_API_URL = "https://api.line.me/v2/bot/message";
const TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
};
// ฟังก์ชันตอบกลับข้อความ
async function replyMessage(replyToken, text) {
    try {
        await axios_1.default.post(`${LINE_API_URL}/reply`, {
            replyToken,
            messages: [{ type: "text", text }],
        }, { headers });
    }
    catch (error) {
        console.error("❌ Error replying:", error);
    }
}
// ฟังก์ชัน push ข้อความหา user
async function pushMessage(userId, text) {
    try {
        await axios_1.default.post(`${LINE_API_URL}/push`, {
            to: userId,
            messages: [{ type: "text", text }],
        }, { headers });
    }
    catch (error) {
        console.error("❌ Error pushing message:", error);
    }
}
// ส่งข้อความแบบ Broadcast
async function broadcastMessage(text) {
    try {
        await axios_1.default.post(`${LINE_API_URL}/broadcast`, {
            messages: [{ type: "text", text }],
        }, { headers });
        console.log("📢 Broadcast sent");
    }
    catch (error) {
        console.error("❌ Error broadcasting message:", error);
    }
}
