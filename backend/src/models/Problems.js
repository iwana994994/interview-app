import mongoose from "mongoose";

const StarterCodeSchema = new mongoose.Schema(
  {
    javascript: {
      type: String,
      required: true,
    },
    python: {
      type: String,
      default: "",
    },
    java: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);


const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        
        question: {
            type: String,
            required: true,
        }, 
        starterCode: {
      type: StarterCodeSchema,
      required: false,
    },
        
    },
    { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;