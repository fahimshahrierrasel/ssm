import { languages } from "../constants";

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

export class SimpleSnippet implements ISnippet {
  id: string;
  name: string;
  snippet: string;
  language: string;
  folder: string | null;
  tags: string[] | null;
  is_favourite: boolean;
  created_at: number | Date;
  updated_at: number | Date;
  deleted_at: number | Date;

  constructor() {
    this.id = "";
    this.name = "";
    this.snippet = "";
    this.language = languages[0];
    this.folder = "";
    this.tags = [];
    this.is_favourite = false;
    this.created_at = new Date().getTime();
    this.updated_at = new Date().getTime();
    this.deleted_at = new Date();
  }
}