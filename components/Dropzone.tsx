"use client"

import { createProduct, getSignature, saveToDatabase } from "@/lib/action"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { useDropzone } from "react-dropzone"
import Select from "./ui/select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

// Extend the File type to include preview
type FileWithPreview = File & {
  preview: string
}

interface FileRejected {
  file: File
  errors: Error[]
}

type SubCategory = { name: string }
const subCategories: SubCategory[] = [
  { name: "Smartphones" },
  { name: "Fiction" },
  { name: "Non-Fiction" },
  { name: "Laptops" },
  { name: "Clothing" },
]

const subCategoryNames = subCategories.map((subCategory) => subCategory.name)

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  price: z
    .number({ message: "Fill out the price" })
    .min(1, { message: "Min value is 1" })
    .positive({
      message: "price must be a positive number.",
    }),
  subCategory: z.enum(subCategoryNames as [string, ...string[]], {
    message: "subCategory must be one of the predefined categories.",
  }),
})

const Dropzone = ({ className }: { className: string }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [rejected, setRejected] = useState<FileRejected[]>([])

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ])
    }

    if (fileRejections?.length) {
      setRejected((previousFiles) => [
        ...previousFiles,
        ...fileRejections.map(({ file, errors }) => ({ file, errors })),
      ])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  })

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name))
  }

  const uploadToCloudinary = async (file: FileWithPreview) => {
    if (!file) return
    const { signature, timestamp } = await getSignature()
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "ml_default")
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
    formData.append("timestamp", timestamp.toString())
    formData.append("signature", signature)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await response.json()
    return data
  }

  const memoizedSubCategories = useMemo(
    () =>
      subCategories.map((subCategory) => (
        <option key={subCategory.name} value={subCategory.name}>
          {subCategory.name}
        </option>
      )),
    []
  )

  const [inputValue, setInputValue] = useState<string>("")
  const [isPending, startTransition] = useTransition()

  const resetForm = () => {
    setInputValue("")
    removeAll()
  }

  const handleUpload = async () => {
    const uploads = files.map((file) => uploadToCloudinary(file))

    const results: Array<{
      secure_url: string
      version: number
      signature: string
      asset_id: string
      public_id: string
    }> = await Promise.all(uploads)

    const imgUrls: string[] = []

    for (const res of results) {
      const response = await saveToDatabase({
        public_id: res.public_id,
        version: res.version,
        signature: res.signature,
      })

      if (response.status === 400) {
        throw new Error(response.error)
      }
      imgUrls.push(res.secure_url)
    }

    return imgUrls
  }

  const handleAddProduct = async (formData: FormData) => {
    const title = formData.get("title") as string
    const price = parseFloat(formData.get("price") as string)
    const subCategory = formData.get("subCategory") as string

    try {
      formSchema.parse({ title, price, subCategory })

      if (!files || files.length === 0) {
        throw new Error("Add at least 1 image")
      }
      startTransition(async () => {
        const imgUrls = await handleUpload()
        if (!imgUrls || imgUrls.length === 0) {
          throw new Error("Somthing went wrong, try again later")
        }

        await createProduct({ title, price, subCategory, imgUrls })
        resetForm()
        toast.success("Product Added!")
      })
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.error(
          "Validation error: ",
          e.errors.map((e) => e.message)
        )
      } else if (e instanceof Error) {
        console.error("Validation error: ", e.message)
      } else {
        console.error("Somthing went wrong, try again later")
      }
    }
  }

  return (
    <>
      <form action={handleAddProduct}>
        <div className="lg:w-1/3 md:w-1/2 space-y-2 mt-5">
          <Input
            //value={inputValue}
            defaultValue=""
            name="title"
            type="text"
            placeholder="title"
          />
          <Input
            defaultValue=""
            //value={inputValue}
            name="price"
            type="number"
            placeholder="price"
          />
          <Select
            //value={inputValue}
            name="subCategory"
          >
            <option value="">Sub-categories</option>
            {memoizedSubCategories}
          </Select>
        </div>
        <div
          {...getRootProps({
            className,
          })}
        >
          <input {...getInputProps({ name: "file" })} />
          <div className="flex flex-col items-center justify-center gap-4">
            <Upload className="h-5 w-5" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
        </div>
        <section className="mt-10">
          <div className="flex gap-4">
            <h2 className="title text-3xl font-semibold">Preview</h2>
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
            >
              Remove all files
            </button>
            <button
              type="submit"
              className="ml-auto mt-1 rounded-md border border-purple-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-purple-400 hover:text-white"
            >
              {isPending ? (
                <span className="flex items-center gap-3">
                  Uploading... <Loader2 className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                "Upload to Cloudinary"
              )}
            </button>
          </div>
          <h3 className="title mt-10 border-b pb-3 text-lg font-semibold text-stone-600">
            Accepted Files
          </h3>
          <ul className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {files.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                  }}
                  className="h-full w-full rounded-md object-contain"
                />
                <button
                  type="button"
                  className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white"
                  onClick={() => removeFile(file.name)}
                >
                  <X className="h-5 w-5 transition-colors hover:fill-rose-400" />
                </button>
                <p className="mt-2 text-[12px] font-medium text-stone-500">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>
          <h3 className="title mt-24 border-b pb-3 text-lg font-semibold text-stone-600">
            Rejected Files
          </h3>
          <ul className="mt-6 flex flex-col">
            {rejected.map(({ file, errors }) => (
              <li key={file.name} className="flex items-start justify-between">
                <div>
                  <p className="mt-2 text-sm font-medium text-stone-500">
                    {file.name}
                  </p>
                  <ul className="text-[12px] text-red-400">
                    {errors.map((error) => (
                      <li key={error.name}>{error.message}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
                  onClick={() => removeRejected(file.name)}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      </form>
    </>
  )
}

export default Dropzone
