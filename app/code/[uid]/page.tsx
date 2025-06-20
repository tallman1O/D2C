"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Code = () => {
  const { uid } = useParams();

  useEffect(() => {
    uid && GetRecordInfo();
  }, [uid]);

  const GetRecordInfo = async () => {
    const result = await axios.get(`/api/wireframe?uid=${uid}`);
    console.log(result.data);
    const resp = result?.data;

    if (resp?.code == null) {
      GenerateCode();
    }

    if (resp?.error) {
      console.log("No Record Found: ", resp?.error);
    }
  };

  const GenerateCode = () => {
    
  };

  return <div>Code</div>;
};

export default Code;
