import { create } from "zustand"
import axiosInstance from "../lib/axios"



export const useInterview = create ((set) => ({

    interviews:[],
interviewOne:null,

isLoading: false,
error:null,


fetchInterview: async() =>{
    set({isLoading:true,error:null})
   try {
     const response = await axiosInstance.get("/api/interviews/allInterview")
     set({interviews:response.data})

    
   } catch (error) {
    set({error:error?.response?.data?.message})
    
   }
     finally {
      set({ isLoading: false });
    }

},
fetchOneInterview: async(id)=>{
    set({isLoading:true,error:null})
    try {
        const response = await axiosInstance.get("/api/interviews/oneInterview",{id})
        set({interviewOne:response.data})
        
    } catch (error) {
    set({error:error?.response?.data?.message})
    
   }
   finally {
      set({ isLoading: false });
    }
},
createInterview:async({ title, problems })=>{
    set({isLoading:true,error:null})
    try {
        const response = await axiosInstance.post("/api/interviews/createInterview",{ title, problems })
        return response.data



        
    } catch (error) {
    set({error:error?.response?.data?.message})
    
   }
   finally {
      set({ isLoading: false });
    }
}






}))