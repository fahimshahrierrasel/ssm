import { IMeta } from "./imeta";

export interface ITag extends IMeta {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
