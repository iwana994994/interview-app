import Editor from "@monaco-editor/react"
import { ArrowBigRight, CodeIcon } from "lucide-react"

const CodeEditor = ({ code, setCode, onRun }) => {
  return (
    <div className="h-full pb-2 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <CodeIcon />
          <span className="font-semibold">Editor</span>
        </div>

        <button
          onClick={onRun}
          className="flex items-center gap-2 bg-accent rounded-2xl px-3 py-2 hover:bg-accent-content" >
          <ArrowBigRight />
          Run
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          value={code}
          onChange={(v) => setCode(v ?? "")}
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  )
}

export default CodeEditor
