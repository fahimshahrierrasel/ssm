export interface ISnippet {
  id: string;
  name: string;
  snippet: string;
  language: string;
  folder: string;
  tags: Map<string, string>;
  is_favourite: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
