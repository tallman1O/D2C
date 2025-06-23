import React from "react";
import { RECORD } from "../[uid]/page";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SelectionDetails = ({ record }: { record: RECORD }) => {
  return (
    <div className="p-5 bg-gray-50 border border-dashed h-[80vh] rounded-lg">
      <h2 className="text-2xl font-bold my-2">Wireframe</h2>
      <Image
        src={record.imageUrl}
        alt="image"
        width={500}
        height={500}
        className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white"
      />

      <div className="mt-6">
        <h2 className="text-2xl font-bold my-2">Cheif AI Designer</h2>
        <Input
          value={record.model}
          disabled
          className="bg-white border border-dashed p-2"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold my-2">Your Commands</h2>
        <Textarea
          value={record.userPrompt}
          disabled
          className="bg-white border border-dashed p-2 h-[150px]"
        />
      </div>
    </div>
  );
};

export default SelectionDetails;
