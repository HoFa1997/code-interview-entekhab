export type IList = {
  id: number;
  model: string | string[];
};

export interface IRepo {
  title: string;
  type: "string" | "array";
  list: IList[];
}

export const repository: IRepo[] = [
  {
    title: "برند خودرو شما چیه",
    type: "string",
    list: [
      { id: 0, model: "پژو" },
      { id: 1, model: "پراید" },
      { id: 2, model: "سمند" },
    ],
  },
  {
    title: "خودروتون رو انتخاب کنید",
    type: "array",
    list: [
      { id: 0, model: ["205", "206", "207"] },
      { id: 1, model: ["صبا", "111", "132"] },
      { id: 2, model: ["دنا", "سورن", "سورن+"] },
    ],
  },
  {
    title: "نوع کاربری وسیله نقلیه خود را انتخاب نمایید",
    type: "string",
    list: [
      { id: 0, model: "سواری" },
      { id: 1, model: "تاکسی" },
      { id: 2, model: "تاکسی بیرون شهری" },
    ],
  },
  {
    title: "سال ساخت خودرو",
    type: "string",
    list: [
      { id: 0, model: "1401" },
      { id: 1, model: "1400" },
      { id: 2, model: "1399" },
    ],
  },
];
