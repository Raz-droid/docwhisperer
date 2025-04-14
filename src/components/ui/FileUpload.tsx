"use client";

import { UploadtoS3 } from "@/lib/s3";
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import React from "react";

const FileUpload = () => {
  const [uploading, setUploading] = React.useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      filekey,
      file_name,
    }: {
      filekey: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create_chat", {
        filekey,
        file_name,
      });
      return response.data;
    },
  });
  const { getInputProps, getRootProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024) {
        alert("Please Upload a smaller file");
        return;
      }
      try {
        setUploading(true);
        const data = await UploadtoS3(file);
        if (!data?.file_name || !data.filekey) {
          alert("Something Went Wrong");
          return;
        }
        mutate(
          { filekey: data.filekey, file_name: data.file_name },
          {
            onSuccess: () => {
              console.log("mutation done", data);
            },
            onError: () => {
              console.log("error creating chat");
            },
          }
        );
        console.log("data", data);
      } catch (error) {
        console.log("Error not uploaded to s3");
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex flex-col justify-center items-center",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isPending ? (
          <>
          <Loader2 className="h-1- w-10 text-blue-500 animate-spin"/>
          <p className="m-2 text-sm text-slate-400">
            spilling tea to gpt
          </p>
          </>
        ) : (
          <>
            <Inbox className="text-blue-500 w-10 h-10 " />
            <p className="text-slate-400 mt-2 text-sm ">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
