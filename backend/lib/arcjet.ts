import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({
  key: process.env.ARCJECT_KEY || "",
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }), // protects app from common attacks e.g. SQL injection, XSS, CSRFP
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }), // blocks all bots except search engines
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // added tokens per interval
      interval: 10, // seconds
      capacity: 10, // tokens
    }),
  ],
});
