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
      {
        problems.map((problem => (
          <div key={problem.id}>
            <h1>{problem.title}</h1>
            <p>{problem.question}</p>
          </div>
        )))
      }
    </div>
  );
};

export default Dashboard;
