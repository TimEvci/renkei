import { Component, For, createSignal, onMount } from "solid-js";
import { languages } from "monaco-editor";

const LanguageDropdown: Component<{
  defaultLanguage: string;
  onSelect: (language: string) => void;
}> = (props) => {
  const [languageOptions, setLanguageOptions] = createSignal<
    languages.ILanguageExtensionPoint[]
  >([]);

  onMount(() => {
    const availableLanguages = languages.getLanguages().filter((lang) => {
      const allowedLanguages = [
        "typescript",
        "javascript",
        "css",
        "html",
        "json",
        "python",
        "java",
        "c",
        "cpp",
        "csharp",
        "go",
        "php",
        "ruby",
        "rust",
        "swift",
        "markdown",
        "yaml",
      ];

      return allowedLanguages.includes(lang.id);
    });
    setLanguageOptions(availableLanguages);
  });

  const handleSelect = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    props.onSelect(target.value);
  };

  return (
    <div>
      <label class="text-white">Language:</label>
      <select
        onChange={handleSelect}
        class="h-12 rounded-md ml-2 mt-2 p-2 bg-zinc-700 text-white"
        aria-label="Programming Language"
      >
        <For each={languageOptions()}>
          {(lang) => (
            <option
              value={lang.id}
              selected={props.defaultLanguage === lang.id}
            >
              {(lang.aliases || [])[0] || ""}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};

export default LanguageDropdown;
