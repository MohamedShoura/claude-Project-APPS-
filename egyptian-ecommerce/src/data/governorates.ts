import type { Governorate } from "./types";

export const governorates: Governorate[] = [
  { nameAr: "القاهرة", nameEn: "Cairo", region: "cairo", fee: 50, etaDays: "1-2" },
  { nameAr: "الجيزة", nameEn: "Giza", region: "giza", fee: 50, etaDays: "1-2" },
  { nameAr: "الإسكندرية", nameEn: "Alexandria", region: "alex", fee: 60, etaDays: "2-3" },
  { nameAr: "القليوبية", nameEn: "Qalyubia", region: "delta", fee: 65, etaDays: "2-3" },
  { nameAr: "الدقهلية", nameEn: "Dakahlia", region: "delta", fee: 65, etaDays: "2-3" },
  { nameAr: "الغربية", nameEn: "Gharbia", region: "delta", fee: 65, etaDays: "2-3" },
  { nameAr: "المنوفية", nameEn: "Monufia", region: "delta", fee: 65, etaDays: "2-3" },
  { nameAr: "الشرقية", nameEn: "Sharqia", region: "delta", fee: 65, etaDays: "2-3" },
  { nameAr: "كفر الشيخ", nameEn: "Kafr El Sheikh", region: "delta", fee: 70, etaDays: "2-4" },
  { nameAr: "دمياط", nameEn: "Damietta", region: "delta", fee: 70, etaDays: "2-4" },
  { nameAr: "بني سويف", nameEn: "Beni Suef", region: "upper", fee: 75, etaDays: "3-4" },
  { nameAr: "المنيا", nameEn: "Minya", region: "upper", fee: 80, etaDays: "3-5" },
  { nameAr: "أسيوط", nameEn: "Asyut", region: "upper", fee: 85, etaDays: "3-5" },
  { nameAr: "سوهاج", nameEn: "Sohag", region: "upper", fee: 85, etaDays: "3-5" },
  { nameAr: "قنا", nameEn: "Qena", region: "upper", fee: 90, etaDays: "4-5" },
  { nameAr: "الأقصر", nameEn: "Luxor", region: "upper", fee: 90, etaDays: "4-5" },
  { nameAr: "أسوان", nameEn: "Aswan", region: "upper", fee: 95, etaDays: "4-6" },
  { nameAr: "الفيوم", nameEn: "Fayoum", region: "upper", fee: 75, etaDays: "3-4" },
  { nameAr: "البحر الأحمر", nameEn: "Red Sea", region: "other", fee: 100, etaDays: "4-6" },
  { nameAr: "جنوب سيناء", nameEn: "South Sinai", region: "other", fee: 100, etaDays: "4-6" },
  { nameAr: "شمال سيناء", nameEn: "North Sinai", region: "other", fee: 100, etaDays: "4-6" },
  { nameAr: "الوادي الجديد", nameEn: "New Valley", region: "other", fee: 100, etaDays: "5-7" },
  { nameAr: "مطروح", nameEn: "Matrouh", region: "other", fee: 95, etaDays: "4-6" },
  { nameAr: "بورسعيد", nameEn: "Port Said", region: "other", fee: 70, etaDays: "2-4" },
  { nameAr: "الإسماعيلية", nameEn: "Ismailia", region: "other", fee: 70, etaDays: "2-4" },
  { nameAr: "السويس", nameEn: "Suez", region: "other", fee: 70, etaDays: "2-4" },
  { nameAr: "البحيرة", nameEn: "Beheira", region: "delta", fee: 65, etaDays: "2-3" },
];

export const FREE_SHIPPING_THRESHOLD = 2000;

export function shippingFeeFor(governorateNameEn: string, subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  const gov = governorates.find((g) => g.nameEn === governorateNameEn);
  return gov ? gov.fee : 80;
}
