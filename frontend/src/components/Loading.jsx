export default function Loading() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-2 border-primary-dark border-t-transparent"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
