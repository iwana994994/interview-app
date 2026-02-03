import { useState } from "react"
import { useInterview } from "../../store/useInterview"
import { useProblems } from "../../store/useProblems"

const CreateInterview = ({ open, onClose }) => {
  const { createInterview, isLoading, error } = useInterview()
  const { problems } = useProblems()

  // ✅ ime intervjua (ne ime problema)
  const [title, setTitle] = useState("")

  // ✅ selektovani problem
  const [selectedProblemId, setSelectedProblemId] = useState("")

  const closeAndReset = () => {
    setTitle("")
    setSelectedProblemId("")
    onClose()
  }

  const canSubmit = title.trim() && selectedProblemId

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    const created = await createInterview({
      title: title.trim(),
      problems: [selectedProblemId], // ✅ intervju na osnovu izabranog problema
    })

    if (created) closeAndReset()
  }

  if (!open) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="text-2xl font-bold mb-4">Create Interview</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* SELECT PROBLEM */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Choose a problem</span>
            </div>

            <select
              className="select select-bordered w-full"
              value={selectedProblemId}
              onChange={(e) => setSelectedProblemId(e.target.value)}
            >
              <option value="" disabled>
                -- select --
              </option>

              {problems.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </label>

          {/* INTERVIEW TITLE */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Interview title</span>
            </div>

            <input
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend Interview #1"
            />
          </label>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div className="modal-action">
            <button type="button" className="btn" onClick={closeAndReset} disabled={isLoading}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary" disabled={!canSubmit || isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>

      <div className="modal-backdrop" onClick={closeAndReset} />
    </div>
  )
}

export default CreateInterview
