export default function Loading() {
  return (
    <div className="container">
      <section className="sm:container py-24">
        <div className="h-6 w-1/3 bg-slate-100 animate-pulse rounded" />
        <div className="mt-14 space-y-2 w-full">
          <div className="h-10 w-1/2 bg-slate-100 animate-pulse rounded" />
          <div className="h-7 w-1/3 bg-slate-100 animate-pulse rounded" />
          <div className="h-7 w-1/3 bg-slate-100 animate-pulse rounded" />
          <div className="h-7 w-1/4 bg-slate-100 animate-pulse rounded" />
        </div>
      </section>
    </div>
  )
}
