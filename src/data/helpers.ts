import { IDropdownItem } from "./models";

export const arrayToItems = (items: any[]): IDropdownItem[] => {
  return items.map((item, index) => {
    if (typeof item !== "string") {
      return { key: item.id, value: item.name } as IDropdownItem;
    }
    return { key: item.toLowerCase(), value: item } as IDropdownItem;
  });
};
