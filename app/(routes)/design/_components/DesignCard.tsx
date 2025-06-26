import { Button } from "@/components/ui/button";
import { models } from "@/data/constants";
import { Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DesignCard({ wireframe }: any) {
  const modelObj =
    wireframe && models.find((x: any) => x.name == wireframe?.model);
  return (
    <div className="p-5 border rounded-lg shadow-md border-dashed">
      <Image
        src={wireframe?.imageUrl}
        alt="image"
        width={300}
        height={200}
        className="w-full h-[200px] object-cover bg-white rounded-lg"
      />

      <div className="mt-2">
        <h2 className="line-clamp-3 text-gray-400 text-sm">
          {wireframe?.description}
        </h2>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 p-2 rounded-lg border-dashed border-2 border-gray-200">
            {modelObj && (
              <Image
                src={modelObj?.icon}
                alt={modelObj?.name ?? ""}
                width={30}
                height={30}
              />
            )}
            <h2>{modelObj?.name}</h2>
          </div>
          <Link href={"/code/" + wireframe?.uid}>
            <Button className="">
              {" "}
              <Code /> View Code
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
