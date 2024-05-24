import "monaco-editor/min/vs/editor/editor.main.css";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import { Suspense, onCleanup, onMount } from "solid-js";
import * as monaco from "monaco-editor";

window.MonacoEnvironment = {
  getWorker(_moduleId: unknown, label: string) {
    switch (label) {
      case "css":
        return new cssWorker();
      case "json":
        return new jsonWorker();
      case "typescript":
      case "javascript":
        return new tsWorker();
      default:
        return new editorWorker();
    }
  },
};

interface MonacoEditorProps {
  value?: string;
  language?: string;
  theme?: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  onEditorMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

const MonacoEditor = (props: MonacoEditorProps) => {
  let container: HTMLDivElement | undefined;

  onMount(() => {
    const editor = monaco.editor.create(container!, {
      value: props.value || "",
      language: props.language || "javascript",
      theme: props.theme || "vs-dark",
      ...props.options,
    });

    if (props.onEditorMount) {
      props.onEditorMount(editor);
    }

    onCleanup(() => {
      editor.dispose();
    });
  });

  return (
    <Suspense
      fallback={
        <svg
          class="m-auto h-12 w-12 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      }
    >
      <div ref={(el) => (container = el)} class="h-full"></div>
    </Suspense>
  );
};

export default MonacoEditor;
