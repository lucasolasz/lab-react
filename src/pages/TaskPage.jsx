import { ChevronLeftIcon } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Titulo from "../components/Titulo";

function TaskPage() {
  const navigate = useNavigate();
  const [sarchParams] = useSearchParams();
  const title = sarchParams.get("title");
  const description = sarchParams.get("description");
  return (
    <div className="w-screen h-screen bg-slate-500 flex-col flex p-6">
      <div className="w-[500px] mx-auto space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0"
          >
            <ChevronLeftIcon className="bg-slate-400 rounded-md text-white" />
          </button>
          <Titulo>Detalhes da tarefa</Titulo>
        </div>
        <div className="bg-slate-400 p-4 rounded-md">
          <h2 className="text-xl text-white font-bold">{title}</h2>
          <p className="text-white">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
