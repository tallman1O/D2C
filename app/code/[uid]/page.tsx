"use client";
import { PROMPT } from "@/data/constants";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface RECORD {
  id: number;
  userPrompt: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
}

const Code = () => {
  const [loading, setLoading] = useState(false);
  const [codeResponse, setCodeResponse] = useState("");
  const { uid } = useParams();
  useEffect(() => {
    uid && GetRecordInfo();
  }, [uid]);

  const GetRecordInfo = async () => {
    setLoading(true);
    const result = await axios.get(`/api/wireframe?uid=${uid}`);
    console.log(result.data);
    const resp = result?.data;

    if (resp?.code == null) {
      GenerateCode(resp);
    }

    if (resp?.error) {
      console.log("No Record Found: ", resp?.error);
    }
    setLoading(false);
  };

  const GenerateCode = async (record: RECORD) => {
    setLoading(true);
    const result = await fetch("/api/model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: record.model,
        userPrompt: record.userPrompt + ":" + PROMPT,
        imageUrl: record.imageUrl,
      }),
    });

    if (!result?.body) return;

    const reader = result?.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader?.read();
      if (done) break;
      const text = decoder
        .decode(value, { stream: true })
        .replace("```jsx", "")
        .replace("```typescript", "")
        .replace("```javascript", "")
        .replace("```tsx", "")
        .replace("jsx", "")
        .replace("```", "");
      setCodeResponse((prev) => prev + text);
      console.log(text);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <LoaderCircle className="animate-spin" />}
      <div className="flex flex-col gap-4">
        <h1 className="text-sm font-bold">{codeResponse}</h1>
      </div>
    </div>
  );
};

export default Code;
