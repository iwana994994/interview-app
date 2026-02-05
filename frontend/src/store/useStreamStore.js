import { create } from "zustand"
import { StreamVideoClient } from "@stream-io/video-react-sdk"
import { StreamChat } from "stream-chat"

const API_KEY = import.meta.env.VITE_STREAM_API_KEY

export const useStreamStore = create((set, get) => ({
  streamClient: null,
  call: null,
  chatClient: null,
  channel: null,
  isInitializing: false,
  error: null,

  // ✅ INIT: pokreće video + chat
  init: async ({ interviewId, user }) => {
    set({ isInitializing: true, error: null })

    try {
      // 1) VIDEO token
      const vRes = await fetch(`/api/stream/video-token?userId=${user.id}`)
      const vData = await vRes.json()
      if (!vRes.ok) throw new Error(vData?.message || "Video token error")

      // 2) CHAT token (može isti token, ali kod tebe su dve rute => uzmi chat token)
      const cRes = await fetch(`/api/stream/chat-token?userId=${user.id}`)
      const cData = await cRes.json()
      if (!cRes.ok) throw new Error(cData?.message || "Chat token error")

      // 3) Stream Video client
      const streamClient = StreamVideoClient.getOrCreateInstance({
        apiKey: API_KEY,
        user: { id: user.id, name: user.name, image: user.image },
        tokenProvider: async () => vData.token,
      })

      // 4) Join call
      const call = streamClient.call("default", interviewId)
      await call.join({ create: true })

      // 5) Stream Chat client + connect
      const chatClient = StreamChat.getInstance(API_KEY)
      await chatClient.connectUser(
        { id: user.id, name: user.name, image: user.image },
        cData.token
      )

      // 6) Channel vezan za interview
      const channel = chatClient.channel("messaging", `interview-${interviewId}`, {
        members: [user.id],
      })
      await channel.watch()

      set({ streamClient, call, chatClient, channel })
    } catch (err) {
      console.error("Stream init error:", err)
      set({ error: err.message || "Failed to init stream" })
    } finally {
      set({ isInitializing: false })
    }
  },

  // ✅ CLEANUP: leave + disconnect
  cleanup: async () => {
  const { call, chatClient } = get()

  try {
    if (call) {
      await call.leave()
      console.log("✅ Left video call")
    }
  } catch (e) {
    console.warn("⚠️ Error leaving call:", e?.message)
  }

  try {
    if (chatClient) {
      await chatClient.disconnectUser()
      console.log("✅ Chat user disconnected")
    }
  } catch (e) {
    console.warn("⚠️ Error disconnecting chat user:", e?.message)
  }

  set({
    streamClient: null,
    call: null,
    chatClient: null,
    channel: null,
  })
  },
}))
