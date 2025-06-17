import React from "react";
import ImageUpload from "./_components/ImageUpload";
import UserInput from "./_components/UserInput";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";

function Dashboard() {
  return (
    <div className="xl:px-16 px-5 py-10">
      <h2 className="font-bold text-4xl">Bring Your Design to Life</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        <ImageUpload />
        <UserInput />
      </div>
      <div className="flex items-center justify-center mt-10">
        <Button className="bg-blue-500 text-white gap-2 font-medium hover:bg-blue-600">
          <WandSparkles className="w-4 h-4" />
          Convert to Code
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
