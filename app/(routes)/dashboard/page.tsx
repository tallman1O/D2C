"use client";
import React from "react";
import ImageUpload from "./_components/ImageUpload";
import UserInput from "./_components/UserInput";
import { Button } from "@/components/ui/button";
import { WandSparkles, Loader2 } from "lucide-react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import useStore from "@/store/useStore";
import { toast } from "sonner";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "@/app/provider";

function Dashboard() {
  const { imageFile, userPrompt, model, isUploading, setIsUploading } =
    useStore();
  const { user } = useAuthContext();
  const handleConvertToCode = async () => {
    if (!imageFile || !userPrompt || !model) {
      toast.error("Please fill in all fields 🤨");
      return;
    }
    try {
      setIsUploading(true);
      const storageRef = ref(storage, `wireframes/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      await uploadTask.then((response) => {
        console.log("Uploaded to Firebase Storage ✅", response);
      });

      const imageUrl = await getDownloadURL(storageRef);
      console.log("Image URL 🔗:", imageUrl);

      const uid = uuidv4();
      //Save Info to Database
      const handleSaveToDatabase = await axios.post("/api/wireframe", {
        imageUrl: imageUrl,
        model: model,
        userPrompt: userPrompt,
        uid: uid,
        email: user?.email,
      });
      console.log(handleSaveToDatabase.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="xl:px-16 px-5 py-10">
      <h2 className="font-bold text-4xl">Bring Your Design to Life</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        <ImageUpload />
        <UserInput />
      </div>
      <div className="flex items-center justify-center mt-10">
        <Button
          className="bg-blue-500 text-white gap-2 font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleConvertToCode}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading Your Designs
            </>
          ) : (
            <>
              <WandSparkles className="w-4 h-4" />
              Convert to Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
