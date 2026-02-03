import mongoose from "mongoose"


const interviewSchema = new mongoose.Schema(
  {
    title: {               // ime intervjua
      type: String,
      required: true,
      trim: true,
    },

    problems: [            // problemi u intervjuu
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",  
        required: true,
      },
    ],
  },
  { timestamps: true }
)

const Interview = mongoose.model("Interview", interviewSchema)
export default Interview
