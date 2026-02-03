import { Group, Panel, Separator } from "react-resizable-panels"
import Problem from "../pages/Problem.jsx"
import CodeEditor from "../pages/CodeEditor.jsx"
import { useParams} from "react-router-dom"
import { useProblems } from "../store/useProblems.js"
import { useEffect,useState } from "react"

import {executeCode} from "../lib/priston.js"

import OutputPanel from "./OutputPanel.jsx"

const ProblemPage = () => {
  const { id } = useParams()

  const { fetchOneProblem } = useProblems()

  const [code,setCode] = useState("")

  const [output, setOutput] = useState(null)

  useEffect(() => {
    if (id)  fetchOneProblem(id).then((problem) => {
      setCode(problem?.starterCode?.javascript ?? "")
       setOutput(null)
    })
  }, [id])

  const handleRunCode = async () =>{
    setOutput(null)

    const result = await executeCode("javascript", code)
    setOutput(result)
  }


  return (
    <div className="h-screen flex">
      <Group direction="horizontal" className="h-full w-full">
        <Panel defaultSize={40} minSize={20}>
          <div className="h-full p-4 rounded-2xl border border-accent">
            <Problem/>
          </div>
        </Panel>

        
        <Separator className=" bg-accent " />

        <Panel defaultSize={60} minSize={30}>
       

          <Group orientation="vertical" className="h-full w-full flex flex-col">
            <Panel defaultSize={60} minSize={20}>
              <div className="h-full p-4 rounded-2xl border border-accent ">
                <CodeEditor 
                 code={code}
                 setCode={setCode}
                 onRun={handleRunCode}
                  />
              </div>
            </Panel>

            {/* vertical separator = height */}
            <Separator className="bg-accent " />

            <Panel defaultSize={40} minSize={20}>
              <div className="h-full p-4 rounded-2xl border border-accent">
                 <OutputPanel output={output} />
              </div>
            </Panel>
          </Group>
        </Panel>
      </Group>
    </div>
  )
}

export default ProblemPage
