import { useEffect } from "react";
import { useProblems } from "../store/useProblems.js";

const Dashboard = () => {
  const { problems, fetchProblems, isLoading, error } = useProblems();

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {Array.isArray(problems) ? (
        problems.map((problem) => (
          <div key={problem._id}>
            <h1>{problem.title}</h1>
            <p>{problem.question}</p>
          </div>
        ))
      ) : (
        <pre>{JSON.stringify(problems, null, 2)}</pre>
      )}
    </div>
  );
};

export default Dashboard;
