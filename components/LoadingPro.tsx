import ProSkeleton from "@/components/ProSkeleton"

export default function Loading() {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full grid gap-0 grid-cols-1 sm:grid-cols-2 min-[960px]:grid-cols-3 min-[1250px]:grid-cols-4 min-[1250px]:gap-2 place-items-center">
          {Array(16)
            .fill(16)
            .map((_, index) => (
              <ProSkeleton key={index} />
            ))}
        </div>
      </div>
    </>
  )
}
