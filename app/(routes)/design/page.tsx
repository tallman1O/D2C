"use client";
import { useAuthContext } from "@/app/provider";
import DesignCard from "./_components/DesignCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Design = () => {
  const [wireframes, setWireframes] = useState<any[]>([]);
  const { user } = useAuthContext();
  const GetAllUserWireframes = async () => {
    const result = await axios.get(`/api/wireframe?email=${user?.email}`);
    console.log(result.data);
    setWireframes(result.data);
  };

  useEffect(() => {
    user && GetAllUserWireframes();
  }, [user]);

  return (
    <div>
      <h2 className="font-bold text-2xl">Wireframe & Codes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {wireframes.map((wireframe, index) => (
          <DesignCard key={index} wireframe={wireframe} />
        ))}
      </div>
    </div>
  );
};

export default Design;
