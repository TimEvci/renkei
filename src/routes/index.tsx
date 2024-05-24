import { createSignal } from "solid-js";
import { clientOnly } from "@solidjs/start";
const Editor = clientOnly(() => import("~/components/Editor"));

export default function Home() {
  const [code, setCode] = createSignal("// Write your code here...");

  return (
    <main class="h-screen">
      <Editor
        value={code()}
        language="typescript"
        theme="vs-dark"
        options={{ fontSize: 16 }}
        onEditorMount={(editor) => {
          editor.onDidChangeModelContent(() => {
            setCode(editor.getValue());
          });
        }}
      />
    </main>
  );
}
