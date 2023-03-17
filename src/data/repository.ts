export type IList = {
  id: number;
  model: string | string[];
  goStep: number;
};

export interface IRepo {
  step: number;
  title: string;
  list: IList[];
}

export const repository: IRepo[] = [
  {
    step: 0,
    title: "برند خودرو شما چیه",
    list: [
      { id: 0, model: "پژو", goStep: 1 },
      { id: 1, model: "پراید", goStep: 1 },
      { id: 2, model: "سمند", goStep: 1 },
    ],
  },
  {
    step: 1,
    title: "خودروتون رو انتخاب کنید",
    list: [
      { id: 0, model: ["205", "206", "207"], goStep: 2 },
      { id: 1, model: ["صبا", "111", "132"], goStep: 2 },
      { id: 2, model: ["دنا", "سورن", "سورن+"], goStep: 2 },
    ],
  },
  {
    step: 2,
    title: "نوع کاربری وسیله نقلیه خود را انتخاب نمایید",
    list: [
      { id: 0, model: "سواری", goStep: 3 },
      { id: 1, model: "تاکسی", goStep: 3 },
      { id: 2, model: "تاکسی بیرون شهری", goStep: 3 },
    ],
  },
  {
    step: 3,
    title: "سال ساخت خودرو",
    list: [
      { id: 0, model: "1401", goStep: 4 },
      { id: 1, model: "1400", goStep: 4 },
      { id: 2, model: "1399", goStep: 4 },
    ],
  },
  {
    step: 4,
    title: "وضعیت بیمه نامه قبلی",
    list: [
      { id: 0, model: "بیمه قبلی داشته ام", goStep: 5 },
      { id: 1, model: "بیمه قبلی نداشته ام", goStep: 6 },
    ],
  },
  {
    step: 5,
    title: "تعداد سال تخفیف عدم خسارت بیمه بدنه",
    list: [
      { id: 0, model: "بدون تخفیف", goStep: 7 },
      { id: 1, model: "یک سال", goStep: 7 },
    ],
  },
  {
    step: 6,
    title: "تخفیف عدم خسارت ثالث",
    list: [
      { id: 0, model: "دو سال", goStep: 7 },
      { id: 1, model: "سه سال", goStep: 7 },
    ],
  },
  {
    step: 7,
    title: "ارزش خودرو",
    list: [
      { id: 0, model: "5,000,000 M", goStep: 8 },
      { id: 1, model: "10,000,000 M", goStep: 8 },
    ],
  },
];
