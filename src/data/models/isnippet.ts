export interface ISnippet {
  id: string;
  name: string;
  snippet: string;
  language: string;
  folder: string | null;
  tags: string[] | null;
  is_favourite: boolean;
  created_at: Date | number;
  updated_at: Date | number;
  deleted_at: Date | number;
}

export interface ISimpleSnippet {
  name: string;
  snippet: string;
  language: string;
  folder: string | null;
  tags: string[] | null;
}
