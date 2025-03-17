export interface ITodayNewsCategoryInterface {
  _id?: any;
  category_name: string;
  category_slug: string;
  category_status: "active" | "in-active";
  category_serial: number;
}

export const todayNewsCategorySearchableField = [
  "category_name",
  "category_status",
];
