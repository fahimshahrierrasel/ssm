import { IMeta } from "./imeta";

export interface IFolder extends IMeta {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
