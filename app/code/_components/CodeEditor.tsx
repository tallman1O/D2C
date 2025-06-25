import React from "react";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { DEPENDANCY, FILES } from "@/data/constants";
import { gruvboxDark } from "@codesandbox/sandpack-themes";

const CodeEditor = ({
  code,
  codeIsGenerated,
}: {
  code: string;
  codeIsGenerated: boolean;
}) => {
  return (
    <div className="border-2 border-dashed rounded-lg p-1">
      {codeIsGenerated ? (
        <Sandpack
          theme={gruvboxDark}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showTabs: true,
            editorHeight: 620,
          }}
          template="react"
          customSetup={{
            dependencies: DEPENDANCY,
          }}
          files={{
            "/App.js": `${code}`,
          }}
        />
      ) : (
        <SandpackProvider
          customSetup={{
            dependencies: DEPENDANCY,
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          template="react"
          theme={gruvboxDark}
          files={{
            "/App.js": {
              code: `${code}`,
              active: true,
            },
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: "620px" }} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
};

export default CodeEditor;
