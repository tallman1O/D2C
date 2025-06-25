"use client";
import { PROMPT } from "@/data/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CodeEditor from "../_components/CodeEditor";
import SelectionDetails from "../_components/SelectionDetails";
import AppHeader from "@/app/_components/AppHeader";
import useStore from "@/store/useStore";
import { Loader2 } from "lucide-react";

export interface RECORD {
  id: number;
  uid: string;
  userPrompt: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
}

const Code = () => {
  const [loading, setLoading] = useState(false);
  const [codeResponse, setCodeResponse] = useState("");
  const [codeIsGenerated, setCodeIsGenerated] = useState(false);
  const { uid } = useParams();
  const { setRecord, record } = useStore();
  useEffect(() => {
    uid && GetRecordInfo();
  }, [uid]);

  const GetRecordInfo = async () => {
    setCodeIsGenerated(false);
    setCodeResponse("");
    setLoading(true);
    const result = await axios.get(`/api/wireframe?uid=${uid}`);
    console.log(result.data);
    const resp = result?.data;
    setRecord(resp);

    if (resp?.code == null) {
      GenerateCode(resp);
    } else {
      setCodeResponse(resp?.code?.response);
      setLoading(false);
      setCodeIsGenerated(true);
    }

    if (resp?.error) {
      console.log("No Record Found: ", resp?.error);
    }
    // setLoading(false);
  };

  const GenerateCode = async (record: RECORD) => {
    setLoading(true);
    setCodeIsGenerated(false);
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
    setLoading(false);

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
    setCodeIsGenerated(true);
    updateCodeToDb();
  };

  useEffect(() => {
    if (codeResponse !== "" && record?.uid && codeIsGenerated && record?.code == null) {
      updateCodeToDb();
    }
  }, [codeResponse && record && codeIsGenerated]);

  const updateCodeToDb = async () => {
    const result = await axios.put("/api/wireframe", {
      uid: record?.uid,
      code: { response: codeResponse },
    });
    console.log("Updated Code: ", result);
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 p-5">
        <div className="col-span-1">
          {/*Selection Details*/}
          {record && (
            <SelectionDetails
              record={record}
              ReGenerateCode={() => GetRecordInfo()}
              codeIsGenerated={codeIsGenerated}
            />
          )}
        </div>
        <div className="col-span-4">
          {/*Code Editor*/}
          {loading ? (
            <div className="flex justify-center items-center h-[620px]">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <CodeEditor code={codeResponse} codeIsGenerated={codeIsGenerated} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Code;
