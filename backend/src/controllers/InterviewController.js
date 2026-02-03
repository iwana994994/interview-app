
import Interview from "../models/Interview.js"

export const createInterview = async(req,res) =>{
    try {
        const {title,problems} = req.body
 if(!title || !problems)
 {return res.status(400).json({message:" Need name !"})}
        const response = new Interview({title,problems})
       await response.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({message:" ❌ Problem with creating Interview"})
    }
}

export const allInterview = async(req,res) => {
    try {
        const response = await Interview.find()
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({message:" ❌ Problem with listing all Interviews "})
    }
}
export const OneInterview = async(req,res) => {
try {
    const{id}= req.params
    const response = await Interview.findById(id)
    res.status(201).json(response)
    
} catch (error) {
     res.status(500).json({message:" ❌ Problem with listing ONE Interviews "})
}
}