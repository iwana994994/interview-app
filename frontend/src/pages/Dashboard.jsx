import { useEffect } from "react";
import { useProblems } from "../store/useProblems.js";

const Dashboard = () => {
  const { problems, fetchProblems, isLoading } = useProblems();

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        problems.map((problem) => (
          <div key={problem._id}>
            <h1>{problem.title}</h1>
            <p>{problem.question}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
