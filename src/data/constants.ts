import { IDropdownItem } from "./models";

export const languages = [
  "plaintext",
  "azcli",
  "bat",
  "c",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dart",
  "dockerfile",
  "fsharp",
  "go",
  "graphql",
  "html",
  "java",
  "javascript",
  "json",
  "kotlin",
  "less",
  "lua",
  "markdown",
  "mysql",
  "objective-c",
  "pgsql",
  "php",
  "powershell",
  "python",
  "r",
  "razor",
  "rust",
  "scheme",
  "scss",
  "shell",
  "sql",
  "swift",
  "typescript",
  "xml",
  "yaml",
];

export const languageItems: IDropdownItem[] = languages.map(
  (language, index) => {
    return { key: index, value: language } as IDropdownItem;
  }
);
