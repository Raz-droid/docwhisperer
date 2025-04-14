"use client"

import { UploadtoS3 } from "@/lib/s3"
import { Inbox } from "lucide-react"
import {useDropzone} from "react-dropzone"

const FileUpload = ()=>{
    const {getInputProps,getRootProps} = useDropzone({
        accept:{"application/pdf":[".pdf"]},
        maxFiles:1,
        onDrop : async (acceptedFiles)=>{
            console.log(acceptedFiles)
            const file  = acceptedFiles[0]
            if (file.size > 10 * 1024){
                alert("Please Upload a smaller file")
                return
            }
            try {
                const data = await UploadtoS3(file)
                console.log("data",data)
            } catch (error) {
                console.log("Error not uploaded to s3")
            }
        },
    })
    return(
       <div className="bg-white rounded-xl">
        <div {...getRootProps({
            className:"border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex flex-col justify-center items-center"
        })}>
           <input {...getInputProps()} />
           <>
           <Inbox className="text-blue-500 w-10 h-10 "/>
           <p className="text-slate-400 mt-2 text-sm ">Drop PDF Here</p>
           </>
        </div>
        </div>
    )
}


export default FileUpload