const OutputPanel = ({ output }) => {
  if (!output) {
    return (
      <div className="h-full p-4 rounded-2xl border border-accent">
        No output yet.
      </div>
    )
  }

  const hasOutput =
    typeof output.output === "string" && output.output.trim().length > 0

  return (
    <div className="h-full p-4 rounded-2xl border border-accent overflow-auto">
      <pre className="whitespace-pre-wrap text-sm">
        {output.success
          ? hasOutput
            ? output.output
            : "👉 Code executed successfully, but nothing was printed."
          : `ERROR:\n${output.error}`}
      </pre>
    </div>
  )
}

export default OutputPanel
