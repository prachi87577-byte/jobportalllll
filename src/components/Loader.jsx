export default function Loader({ text = 'Loading jobs...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-brand-100 border-t-brand-600 animate-spin" />
      <p className="text-slate-500 text-sm font-medium">{text}</p>
    </div>
  )
}
