import React from "react";
import { RECORD } from "../[uid]/page";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";

const SelectionDetails = ({
  record,
  ReGenerateCode,
  codeIsGenerated,
}: {
  record: RECORD;
  ReGenerateCode: any;
  codeIsGenerated: boolean;
}) => {
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
        <Button
          className="mt-10 bg-blue-500 text-white hover:bg-blue-700"
          onClick={ReGenerateCode}
          disabled={!codeIsGenerated}
        >
          {" "}
          <RefreshCcwIcon /> Re - Generate Code
        </Button>
      </div>
    </div>
  );
};

export default SelectionDetails;
