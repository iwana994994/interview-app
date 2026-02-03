
import Problems from "../models/Problems.js"
export const allProblems= async(req, res) => {
    try{
        const problems = await Problems.find()
        res.status(200).json(problems);
    }
    catch (error) {
        console.error(" (☞ﾟヮﾟ)☞ Error fetching problems :", error);
        res.status(500).json({ message: "Error fetching songs" });
    }
}

export const ProblemOne = async(req,res) => {
try {
       const {id}= req.params
    const response = await Problems.findById(id);
   
    res.status(200).json(response)

    
} catch (error) {
   res.status(500).json({ message: "Problem can't fetch this problem." })

}
}
export const CreateProblem =async(req,res)=>{
   try {
    const {title,question}=req.body


    if (!title || !question) {
      return res.status(400).json({
        message: "Title and question are required",
      })
    }
    const problem= new Problems(
        {
            title,question
        }
    ) 
    await problem.save()
    res.status(201).json(problem)
    
   } catch (error) {
    res.status(500).json({message:" ❌ Can't create problem"})
    
   }
}