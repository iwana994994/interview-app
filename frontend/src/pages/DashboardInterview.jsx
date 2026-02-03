import { useState,useEffect } from "react"
import { Code2Icon } from "lucide-react"
import CreateInterview from "../pages/components/CreateInterview.jsx"
import CreateProblem from "../pages/components/CreateProblem.jsx"
import { useProblems } from "../store/useProblems.js"
import {useInterview} from "../store/useInterview.js"
import { useNavigate } from "react-router-dom"

const DashboardInterview = () => {
  const [openInterview, setOpenInterview] = useState(false)
   const [openProblem, setOpenProblem] = useState(false)

   const{problems,fetchProblems}=useProblems()
  const { interviews, fetchInterview } = useInterview()

useEffect(() => {
  fetchInterview()
  fetchProblems()
}, [fetchInterview,fetchProblems])

const navigate = useNavigate()

  return (
    <>
    <div className="flex justify-center p-4 ">
        <span className="text-3xl font-bold ">
            <h1 className="bg-accent bg-clip-text text-transparent">Dashboard</h1>
        </span>
    </div>
    <div className="flex items-center justify-between">
     
      <div className="flex-col  mt-4">
        <span>Problem list</span>
         <div className=" h-[400px] overflow-y-auto rounded-2xl border border-gray-500 p-2">
          
          {problems.map((problem)=>(
            <div key={problem._id} className="border-b border-gray-500 ">
              <h1 className="text-xl">{problem.title}</h1>
              <p>{problem.question}</p>
              </div>
              
          ))}
          
        </div>
        <div>
         <span>Active Interview</span>
         <div className=" h-[400px] overflow-y-auto rounded-2xl border border-gray-500 p-2">
          
          {interviews.map((interview)=>(
            <div key={interview._id} className="border-b border-gray-500 flex justify-between">
              <h1 className="text-xl">{interview.title}</h1>
              <button onClick={() => navigate(`/interview-dashboard/${interview._id}`)} className="rounded-2xl bg-accent text-white hover:bg-transparent p-2 mb-1">Join</button>
             
              </div>
              
          ))}
        </div>
       </div>
            </div> 
<div className="flex  ">

        <button onClick={() => setOpenProblem(true)}
          className="gap-2 mr-4 hover:bg-accent-content p-4 ml-100 rounded-2xl bg-accent text-white text-2xl flex items-center"
        >
          <Code2Icon />
          <span>Create Problem</span>
        </button>
        </div>
    

        <button
          onClick={() => setOpenInterview(true)}
          className="gap-2 hover:bg-accent-content p-4 mr-20 rounded-2xl bg-accent text-white text-2xl flex items-center"
        >
          <Code2Icon />
          <span>Create Interview</span>
        </button>
        </div>
      
   

      {/* 👉 STATE POZIVA KOMPONENTU */}
      {openInterview && <CreateInterview open={openInterview} onClose={() => setOpenInterview(false)} />}
        {openProblem && (<CreateProblem open={openProblem} onClose={() => setOpenProblem(false)}
  />
)}

    </>
  )
}

export default DashboardInterview
