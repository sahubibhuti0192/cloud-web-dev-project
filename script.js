import awsIot from "aws-iot-device-sdk";
import { WebSocketServer } from "ws";
import fs from "fs";

const keyPath = "C:/Users/sahub/Downloads/private.key";
const certPath = "C:/Users/sahub/Downloads/cir.crt";
const caPath = "C:/Users/sahub/Downloads/AmazonRootCA1.pem";

if (!fs.existsSync(keyPath)) console.error("❌ Private Key file not found!");
if (!fs.existsSync(certPath)) console.error("❌ Certificate file not found!");
if (!fs.existsSync(caPath)) console.error("❌ CA file not found!");

const device = awsIot.device({ keyPath, certPath, caPath, clientId: "Bibhu", host: "aebfzuqqcp989-ats.iot.ap-southeast-2.amazonaws.com" });


// Handle AWS IoT Connection
device.on("connect", () => {
  console.log("✅ Connected to AWS IoT Core");
  device.subscribe("esp32/control");
});

device.on("message", (topic, payload) => {
  console.log(`📩 Message received: ${payload.toString()} on topic ${topic}`);
});

// WebSocket Server for Web Control
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("✅ WebSocket Connection Established");

  ws.on("message", (message) => {
    const command = JSON.parse(message).message;
    console.log(`📤 Sending to IoT: ${command}`);
    device.publish("esp32/control", JSON.stringify({ message: command }));
  });

  device.on("message", (topic, payload) => {
    ws.send(payload.toString());
  });
});

console.log("🚀 WebSocket Server Running on ws://localhost:8080");
