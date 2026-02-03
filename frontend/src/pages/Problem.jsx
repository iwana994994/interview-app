import { useNavigate, useParams } from "react-router-dom"
import { useProblems } from "../store/useProblems"
import { useEffect } from "react"

const Problem = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    problems,
    problemOne,
    isLoading,
    error,
    fetchProblems,
    fetchOneProblem,
  } = useProblems()

  // učitaj listu problema
  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  // učitaj jedan problem kad se promeni id u URL-u
  useEffect(() => {
    if (id) fetchOneProblem(id)
  }, [id, fetchOneProblem])

  const handleChange = (e) => {
    const newId = e.target.value
    navigate(`/problems/${newId}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!problemOne) return <div>Nema problema (problemOne je null)</div>

  return (
    <div>
      <h1 className="font-bold text-2xl pb-6">{problemOne.title}</h1>

      <select
        className="border p-2 w-full bg-transparent mb-6 rounded-2xl"
        value={problemOne._id}
        onChange={handleChange}
      >
        {problems.map((p) => (
          <option key={p._id} value={p._id} className="bg-black text-white">
            {p.title}
          </option>
        ))}
      </select>

      <div className="border border-accent rounded-2xl p-4">
        <p className="whitespace-pre-wrap">{problemOne.question}</p>
      </div>
    </div>
  )
}

export default Problem
