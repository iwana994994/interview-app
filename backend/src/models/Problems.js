import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        
        question: {
            type: String,
            required: true,
        }
        
    },
    { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;