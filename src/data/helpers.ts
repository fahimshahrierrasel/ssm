import { IDropdownItem, IMeta } from "./models";

function instanceOfIMeta(obj: any): obj is IMeta {
  return "name" in obj;
}

export const arrayToItems = (items: any[]): IDropdownItem[] => {
  return items.map((item, index) => {
    if (instanceOfIMeta(item)) {
      return { key: index, value: item.name } as IDropdownItem;
    }
    return { key: index, value: item } as IDropdownItem;
  });
};
