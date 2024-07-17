import Dropzone from "@/components/Dropzone"

export default function page() {
  return (
    <div className="container my-10">
      <h1 className="text-2xl font-bold dark:text-rose-500 mb-2">
        Add Product
      </h1>
      <section className="py-24">
        <div className="container">
          <h1 className="text-3xl font-bold">Upload Files</h1>
          <Dropzone className="mt-10 border border-neutral-200 p-16 cursor-pointer" />
        </div>
      </section>
    </div>
  )
}
