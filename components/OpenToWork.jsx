export default function OpenToWork() {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-4 p-6 mb-16 border border-dashed rounded-lg bg-muted">
      <h2 className="text-xl font-semibold text-green-200 opacity-80">New Update!</h2>

      <div className="pl-2 border-l-4 border-green-400 text-sm text-muted-foreground">
        <ul className="list-disc list-inside space-y-1">
          <li>Added AI Assistant</li>
          <li>Fixed reported bugs</li>
        </ul>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <p>Version 1.0.1</p>
        <p>Update date: 2025/10/9</p>
      </div>
    </div>
  );
}
