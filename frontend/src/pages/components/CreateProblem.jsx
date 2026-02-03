import {  useEffect, useState } from "react"
import { useProblems } from "../../store/useProblems" // <- prilagodi putanju

const CreateProblem = ({ open, onClose }) => {
  const { createProblem, isLoading, error } = useProblems()

  const [title, setTitle] = useState("")
  const [question, setQuestion] = useState("")


  const canSubmit = title.trim() && question.trim()

const closeAndReset = () => {
  setTitle("")
  setQuestion("")
  onClose()
}
useEffect(()=>{
  if(!open){
    closeAndReset
  }
},[closeAndReset])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    const created = await createProblem({
      title: title.trim(),
      question: question.trim(),
    })

    if (created) onClose() // zatvori samo ako je uspešno
  }

  if (!open) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="text-2xl font-bold mb-4">Create problem</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Reverse String"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Question</span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full min-h-40"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Describe the task + examples..."
            />
          </label>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={onClose && closeAndReset}
              disabled={isLoading}
              
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canSubmit || isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* zatvaranje klikom van */}
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  )
}

export default CreateProblem
