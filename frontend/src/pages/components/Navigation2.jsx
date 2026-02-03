import { SignedOut, SignInButton,UserButton,SignedIn } from "@clerk/clerk-react"
import { ArrowRightIcon, SparklesIcon } from "lucide-react"
import Dashboard from "../Dashboard.jsx"
import InterviewDashboard from "../InterviewDashboard.jsx"
import {  useNavigate } from "react-router-dom"





const Navigation2 = () => {

  const navigate = useNavigate()


  return (
    <nav >
      <div className="mx-auto flex items-center justify-between ">
        

 {/*RIGHT SIDE */}
        </div>
        <div className="flex items-center justify-between gap-6">
         
         <button onClick={()=>navigate("/dashboard")} className="flex justify-between items-center rounded-2xl bg-accent p-2 gap-2 hover:bg-accent-hover cursor-pointer">
            <span className="text-white">Practice</span>
            <ArrowRightIcon size={18} className="text-white" />
            </button>
        <button onClick={()=>navigate("/list-interview")} className="flex justify-between items-center rounded-2xl bg-accent p-2 gap-2 hover:bg-accent-hover cursor-pointer"> 
            <span className="text-white">Active Interview</span> 
            <ArrowRightIcon size={18} className="text-white" />
            </button>
             
          
            <button onClick={()=>navigate("/dashboard-interview")} className="flex justify-between items-center rounded-2xl bg-accent p-2 gap-2 hover:bg-accent-hover cursor-pointer"> 
            <span className="text-white">Dashboard</span> 
            <ArrowRightIcon size={18} className="text-white" />
            </button>
             
        <UserButton />
    
      
</div>
     
    </nav>
  )
}

export default Navigation2
