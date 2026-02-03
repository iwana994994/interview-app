import { Route, Routes,Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'
import ProblemPage from './pages/ProblemPage'
import Dashboard from './pages/Dashboard'
import './App.css'
import Navigation from "../../frontend/src/pages/components/Navigation"

import ListInterview from './pages/ListInterview.jsx'
import DashboardInterview from './pages/DashboardInterview.jsx'
import InterviewDashboard from "./pages/InterviewDashboard.jsx"


function App() {
 
  const {isSignedIn} = useUser()
 
  return (
     <>
   <Navigation/>
   <Routes>
   <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" /> : <HomePage />}
        />
   <Route path='/dashboard' element={isSignedIn ? <Dashboard/>: <Navigate to="/"/> }/>
   <Route path="/problems/:id" element={isSignedIn ? <ProblemPage/>:<Navigate to="/"/> }/>
   <Route path='/list-interview' element={isSignedIn ? <ListInterview/> : <Navigate to="/"/> }/>
   <Route path='/dashboard-interview' element={isSignedIn ? <DashboardInterview/> : <Navigate to="/"/> }/>
   <Route path="/interview-dashboard/:id" element={isSignedIn ? <InterviewDashboard /> : <Navigate to="/" />}/>
  </Routes>


    </>
  )
}

export default App
