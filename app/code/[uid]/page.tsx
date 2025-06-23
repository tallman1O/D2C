"use client";
import { PROMPT } from "@/data/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CodeEditor from "../_components/CodeEditor";
import SelectionDetails from "../_components/SelectionDetails";
import AppHeader from "@/app/_components/AppHeader";
import useStore from "@/store/useStore";

export interface RECORD {
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
  const { setRecord, record } = useStore();
  useEffect(() => {
    uid && GetRecordInfo();
  }, [uid]);

  const GetRecordInfo = async () => {
    setLoading(true);
    const result = await axios.get(`/api/wireframe?uid=${uid}`);
    console.log(result.data);
    const resp = result?.data;
    setRecord(resp);

    if (resp?.code == null) {
      // GenerateCode(resp);
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
    }
    setLoading(false);
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 p-5">
        <div className="col-span-1">
          {/*Selection Details*/}
          {record && <SelectionDetails record={record} />}
        </div>
        <div className="col-span-4">
          {/*Code Editor*/}
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default Code;
