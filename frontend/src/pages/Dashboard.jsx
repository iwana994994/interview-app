import { useEffect } from "react";
import { useProblems } from "../store/useProblems.js";
import { Link } from "react-router-dom";
import { ArrowRightIcon, Code2Icon } from "lucide-react";


const Dashboard = () => {
  const { problems, fetchProblems, isLoading, error } = useProblems();

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
   <div className="p-6 flex flex-col gap-2">
  {problems.map((problem) => (
    <Link key={problem._id} to={`/problems/${problem._id}`} className="block">
      <div className="  border border-accent
  p-4 rounded-2xl
  bg-transparent
  hover:bg-white/10">
        <div className="flex flex-col">
          <div className="flex">
            <Code2Icon size={45} className="pr-4 pt-1" />
            <h1 className="pb-4 text-xl font-black pt-2">
              {problem.title}
            </h1>
          </div>
          <p className="text-xl">{problem.question}</p>
        </div>

        <ArrowRightIcon size={18} className="text-white mt-4" />
      </div>
    </Link>
  ))}
</div>

  );
};

export default Dashboard;
