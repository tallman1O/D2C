import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";
import useStore from "@/store/useStore";

const models = [
  {
    name: "Gemini",
    icon: "https://img.icons8.com/color/48/gemini-ai.png",
  },
  {
    name: "llama",
    icon: "https://img.icons8.com/fluency/48/meta.png",
  },
  {
    name: "Deepseek",
    icon: "https://img.icons8.com/color/48/deepseek.png",
  },
];

const UserInput = () => {
  const { setModel, setUserPrompt } = useStore();
  return (
    <>
      <div className="flex flex-col mt-10 items-start justify-center p-7 border border-dashed rounded-md shadow-md gap-4">
        <h2 className="text-lg font-bold">Select your Chief AI Designer</h2>
        <Select onValueChange={(value) => setModel(value)}>
          <SelectTrigger className="border border-dashed">
            <SelectValue placeholder="Select a Model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model, index) => (
              <SelectItem key={index} value={model.name}>
                <div className="flex items-center gap-2">
                  <Image
                    src={model.icon}
                    alt={model.name}
                    width={20}
                    height={20}
                  />
                  <span>{model.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <h2 className="text-lg font-bold">Share Your Idea with the Chief</h2>
        <Textarea
          onChange={(e) => setUserPrompt(e?.target.value)}
          placeholder="Write about your idea"
          className="h-[160px] border border-dashed"
        />
      </div>
    </>
  );
};

export default UserInput;
