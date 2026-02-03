import { useEffect, useRef, useState } from "react"
import { Group, Separator, Panel } from "react-resizable-panels"
import CodeEditor from "./CodeEditor.jsx"

import { useProblems } from "../store/useProblems.js"
import {useParams,useNavigate} from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import {useStreamStore} from "../store/useStreamStore.js"

import { StreamVideo, StreamCall } from "@stream-io/video-react-sdk"
import VideoCallUI from "../pages/components/VideoCall.jsx" 


const InterviewDashboard = () => {
  const { problems, fetchProblems, fetchOneProblem, problemOne } = useProblems()

  const [selectedProblemId, setSelectedProblemId] = useState("")
  const [code, setCode] = useState("")


  const [isOpen, setIsOpen] = useState(false)
  const chatRef = useRef(null)

    const { id: interviewId } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()

  const { streamClient, call, chatClient, channel, init, cleanup, isInitializing, error } =
    useStreamStore()

  useEffect(() => {
    if (!interviewId || !user) return

    init({
      interviewId,
      user: {
        id: user.id,
        name: user.fullName || "User",
        image: user.imageUrl,
      },
    })

    return () => {
      cleanup()
    }
  }, [interviewId, user?.id])


  
  // učitaj listu problema jednom
  useEffect(() => {
    fetchProblems()
  }, [])

  // kada korisnik izabere problem → povuci taj problem i postavi starter code
  useEffect(() => {
    if (!selectedProblemId) return

    fetchOneProblem(selectedProblemId).then((p) => {
      setCode(p?.starterCode?.javascript ?? "")
   
    })
  }, [selectedProblemId, fetchOneProblem])

  // chat panel toggle (tvoj ref)
  useEffect(() => {
    if (!chatRef.current) return
    if (isOpen) chatRef.current.expand()
    else chatRef.current.collapse()
  }, [isOpen])




  if (isInitializing) return <div className="p-6">Connecting…</div>
  if (error) return <div className="p-6 text-red-400">{error}</div>
  if (!streamClient || !call) return <div className="p-6">Not connected</div>




  return (
    <div className="h-screen">
      <Group direction="horizontal" className="h-full w-full">
        {/* LEVI DEO: problem + editor */}
        <Panel defaultSize={70} minSize={40}>
          <Group orientation="vertical" className="h-full w-full">
            {/* Problem panel */}
            <Panel defaultSize={40} minSize={20}>
              <div className="h-full p-4 rounded-2xl border border-accent overflow-y-auto">
                <div className="mb-4">
                  <select
                    className="select select-bordered w-full"
                    value={selectedProblemId}
                    onChange={(e) => setSelectedProblemId(e.target.value)}
                  >
                    <option value="" disabled>
                      -- choose a problem --
                    </option>
                    {problems.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                {!problemOne ? (
                  <div className="opacity-70">Choose a problem to start.</div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold mb-2">{problemOne.title}</h1>
                    <p className="whitespace-pre-wrap">{problemOne.question}</p>
                  </>
                )}
              </div>
            </Panel>

            <Separator />

            {/* Code editor panel */}
            <Panel defaultSize={60} minSize={20}>
              <div className="h-full p-4 rounded-2xl border border-accent">
                <CodeEditor code={code} setCode={setCode}  />
              
              </div>
            </Panel>
          </Group>
        </Panel>

        <Separator className="h-full" />

        {/* DESNI DEO: output + chat toggle */}
        <Panel defaultSize={30} minSize={20}>
          <Group direction="horizontal" className="h-full w-full">
            <Panel defaultSize={40} minSize={20}>
              <div className="h-full p-4 rounded-2xl border border-accent">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Video Call</span>
                  <button
                    onClick={() => setIsOpen((v) => !v)}
                    className="rounded-2xl p-2 bg-accent text-black hover:bg-accent-content hover:text-white"
                  >
                    {isOpen ? "Close chat" : "Open chat"}
                  </button>
                </div>
                  <StreamVideo client={streamClient}>
        <StreamCall call={call}>
          <VideoCallUI
            chatClient={chatClient}
            channel={channel}
            onLeave={() => navigate("/dashboard")}
          />
        </StreamCall>
      </StreamVideo>

               
              </div>
            </Panel>

          
          </Group>
        </Panel>
      </Group>
    </div>
  )
}

export default InterviewDashboard
