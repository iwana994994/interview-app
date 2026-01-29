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