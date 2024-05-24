import { createSignal } from "solid-js";
import { clientOnly } from "@solidjs/start";

const Editor = clientOnly(() => import("~/components/editor"));
const LanguageDropdown = clientOnly(
  () => import("~/components/language-dropdown")
);

export default function Home() {
  const [language, setLanguage] = createSignal<string>("typescript");
  const [code, setCode] = createSignal("console.log('Hello, World!')");

  return (
    <main class="h-screen">
      <div class="ml-10 h-20">
        <LanguageDropdown
          defaultLanguage={language()}
          onSelect={(language) => setLanguage(language)}
        />
      </div>
      <div class="h-[calc(100vh-80px)]">
        <Editor
          value={code()}
          language={language()}
          theme="vs-dark"
          options={{ fontSize: 16 }}
          onEditorMount={(editor) => {
            editor.onDidChangeModelContent(() => {
              setCode(editor.getValue());
            });
          }}
        />
      </div>
    </main>
  );
}
