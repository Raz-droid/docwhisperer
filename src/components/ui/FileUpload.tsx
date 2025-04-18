"use client";

import { UploadtoS3 } from "@/lib/s3";
import { FileUp, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import React from "react";
import { useRouter } from "next/navigation";

const FileUpload = () => {
  const router = useRouter();
  const [isuploadingtos3, setUploadingtos3] = React.useState(false);
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
        toast.error("Please Upload a smaller file");
        return;
      }
      try {
        setUploadingtos3(true);
        const data = await UploadtoS3(file);
        if (!data?.file_name || !data.filekey) {
          toast.error("Something Went Wrong");
          return;
        }
        mutate(
          { filekey: data.filekey, file_name: data.file_name },
          {
            onSuccess: ({ chat_id }) => {
              toast.success("chat Created successfully");
              router.push(`/chat/${chat_id}`);
            },
            onError: () => {
              toast.error("error creating chat");
            },
            onSettled: () => setUploadingtos3(false),
          }
        );
        console.log("data", data);
      } catch (error) {
        console.log("Error not uploaded to s3", error);
      } finally {
      }
    },
  });
  return (
    <div className="rounded-xl bg-white/50 p-1">
      <div
        {...getRootProps({
          className:
            "border-2 border-dashed border-slate-300 rounded-lg bg-white/50 p-8 transition-all hover:border-rose-400 hover:bg-rose-50/50 cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          {isuploadingtos3 && isPending ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-rose-500" />
              <p className="text-sm text-slate-500">
                Processing your document...
              </p>
            </>
          ) : (
            <>
              <div className="rounded-full bg-rose-100 p-3">
                <FileUp className="h-6 w-6 text-rose-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-900">
                  Drop your PDF here
                </p>
                <p className="text-xs text-slate-500">
                  or click to browse files
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileUpload;
