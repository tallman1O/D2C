"use client";
import { CloudUpload, X } from "lucide-react";
import React from "react";
import useStore from "@/store/useStore";
import Image from "next/image";

const ImageUpload = () => {
  const { setImageUrl, imageUrl } = useStore();
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };
  return (
    <div className="mt-10">
      {!imageUrl ? (
        <div className="flex flex-col items-center justify-center p-7 border border-dashed rounded-md shadow-md">
          <CloudUpload className="w-10 h-10 text-gray-400" />
          <h2 className="text-lg font-bold">Upload Your Idea</h2>
          <p className="text-sm text-gray-500">
            Select a wireframe image to get started.
          </p>
          <div className="p-5 border border-dashed w-full mt-7 flex items-center justify-center h-[200px]">
            <label htmlFor="image-upload" className="cursor-pointer">
              <h2 className="flex items-center justify-center text-sm text-gray-500 p-2 h-[200px]">
                Select Image
              </h2>
            </label>
          </div>
          <input
            type="file"
            id="image-upload"
            className="hidden "
            accept="image/*"
            multiple={false}
            onChange={onImageUpload}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-7 gap-4 border border-dashed rounded-md shadow-md">
          <X
            className="w-10 h-10 text-gray-400 flex items-end justify-end cursor-pointer border border-dashed duration-300 transition-all transform hover:text-red-500 hover:border-red-500 rounded-full p-2"
            onClick={() => setImageUrl(null)}
          />
          <Image
            src={imageUrl || ""}
            alt="Uploaded"
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
