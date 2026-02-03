import { create } from "zustand";
import axiosInstance from "../lib/axios";


export const useProblems = create((set) => ({
  problems: [],
  isLoading: false,
  error: null,
  problemOne:null,

  fetchProblems: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/api/problems/all");
      set({ problems: response.data });
       console.log("response",response.data);
     
        


    } catch (error) {
      set({ error: error.response.data.message });
      
    } finally {
      set({ isLoading: false });
    }
  },
 fetchOneProblem: async(id) => {

set({isLoading:true,error:null})

try {
    const response = await axiosInstance.get(`/api/problems/all/${id}`)
    set({problemOne:response.data})
       return response.data // ✅ OVO DODAJ

  
} catch (error) {
  set({error:error.response.data.message})
  return null
}
finally{
  set({isLoading:false})
}
 },


createProblem : async ({ title, question }) => {
     set({ isLoading: true, error: null });

    try {
      
      const response = await axiosInstance.post("/api/problems/createProblem", { title, question })

      return response.data // vrati problem 
    } catch (err) {
       set({ error: err?.response?.data?.message });
    } finally {
      set({isLoading:false})
    }
  }


}







))

