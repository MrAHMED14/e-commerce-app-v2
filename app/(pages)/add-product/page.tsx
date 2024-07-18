import Dropzone from "@/components/Dropzone"

export default function page() {
  return (
    <div className="container">
      <section className="sm:container py-24">
        <Dropzone className="mt-10 border border-neutral-200 rounded sm:p-16 cursor-pointer" />
      </section>
    </div>
  )
}
