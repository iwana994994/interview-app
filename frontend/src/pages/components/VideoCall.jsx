import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"
import { useState } from "react"
import { Chat, Channel, MessageList, MessageInput, Window } from "stream-chat-react"
import { useStreamStore } from "../../store/useStreamStore.js"

export default function VideoCallUI({ chatClient, channel, onLeave }) {
  // ✅ HOOKS UVEK NA VRHU (pre return)
  const { call } = useStreamStore()

  const { useCallCallingState, useParticipantCount } = useCallStateHooks()
  const callingState = useCallCallingState()
  const participantCount = useParticipantCount()

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [camOn, setCamOn] = useState(true)

  const toggleCamera = async () => {
    if (!call) return

    try {
      if (camOn) {
        await call.camera.disable()
        setCamOn(false)
      } else {
        await call.camera.enable()
        setCamOn(true)
      }
    } catch (e) {
      console.warn("Camera toggle failed:", e)
    }
  }

  if (callingState === CallingState.JOINING) return <div>Joining call…</div>

  return (
    <div className="h-full flex gap-3 relative str-video">
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between bg-base-100 p-3 rounded-lg">
          <div className="font-semibold">Participants: {participantCount}</div>

          <div className="flex gap-2">
            {chatClient && channel && (
              <button className="btn btn-sm" onClick={() => setIsChatOpen((v) => !v)}>
                {isChatOpen ? "Close chat" : "Open chat"}
              </button>
            )}

            <button
              onClick={toggleCamera}
              className="btn btn-sm"
              title={camOn ? "Turn camera off" : "Turn camera on"}
            >
              {camOn ? "Camera OFF" : "Camera ON"}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-base-300 rounded-lg overflow-hidden">
          <SpeakerLayout />
        </div>

        <div className="bg-base-100 p-3 rounded-lg flex justify-center">
          <CallControls onLeave={onLeave} />
        </div>
      </div>

      {chatClient && channel && isChatOpen && (
        <div className="w-80 rounded-lg overflow-hidden bg-[#272a30]">
          <Chat client={chatClient} theme="str-chat__theme-dark">
            <Channel channel={channel}>
              <Window>
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </Chat>
        </div>
      )}
    </div>
  )
}
