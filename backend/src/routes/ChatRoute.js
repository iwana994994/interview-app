import express from "express"
import { chatClient, streamClient } from "../lib/stream.js" // prilagodi putanju

const router = express.Router()

router.get("/chat-token", (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) return res.status(400).json({ message: "Missing userId" })

    const token = chatClient.createToken(userId)
    return res.json({ token })
  } catch (err) {
    console.error("chat-token error:", err)
    return res.status(500).json({ message: "Chat token error" })
  }
})
router.get("/video-token", (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) return res.status(400).json({ message: "Missing userId" })

    const token = streamClient.generateUserToken({
      user_id: userId,
      validity_in_seconds: 60 * 60,
    })

    return res.json({ token })
  } catch (err) {
    console.error("video-token error:", err)
    return res.status(500).json({ message: "Video token error" })
  }
})

export default router
