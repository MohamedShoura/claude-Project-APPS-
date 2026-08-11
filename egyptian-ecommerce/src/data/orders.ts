import type { Order, OrderStatus } from "./types";
import { products } from "./products";

function itemFrom(productId: string, qty: number) {
  const p = products.find((x) => x.id === productId)!;
  return {
    productId: p.id,
    slug: p.slug,
    nameAr: p.nameAr,
    nameEn: p.nameEn,
    image: p.images[0],
    qty,
    price: p.price,
    originalPrice: p.originalPrice,
  };
}

const names = [
  "أحمد السيد", "منى عبد العزيز", "خالد حسين", "إيمان فوزي", "طارق نور الدين",
  "هبة الله عادل", "عمرو دياب", "سلمى وائل", "محمد رضا", "نادية كمال",
];
const govs = ["Cairo", "Giza", "Alexandria", "Dakahlia", "Sharqia", "Aswan"];
const statuses: OrderStatus[] = ["new", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "delivered", "cancelled", "returned", "delivered"];

export const orders: Order[] = Array.from({ length: 22 }).map((_, i) => {
  const items = [itemFrom(products[i % products.length].id, 1 + (i % 2))];
  if (i % 3 === 0) items.push(itemFrom(products[(i + 5) % products.length].id, 1));
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = i % 4 === 0 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount >= 2000 ? 0 : 60;
  const daysAgo = i * 1.3;
  return {
    id: `ord-${i + 1}`,
    orderNumber: `NS-${10450 + i}`,
    customerName: names[i % names.length],
    mobile: `01${(i % 2 === 0 ? "0" : "1")}${String(10000000 + i * 137).slice(0, 8)}`,
    email: `customer${i + 1}@example.com`,
    governorate: govs[i % govs.length],
    city: govs[i % govs.length],
    address: `شارع ${i + 10}, مبنى ${i + 1}`,
    items,
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    paymentMethod: (["cod", "card", "wallet", "instapay"] as const)[i % 4],
    status: statuses[i % statuses.length],
    createdAtISO: new Date(Date.now() - daysAgo * 86400000).toISOString(),
    couponCode: i % 4 === 0 ? "SAVE10" : undefined,
  };
});

const newCustomerNames = ["مريم أشرف", "كريم سعيد", "دينا سامي", "يوسف عبد الله"];

newCustomerNames.forEach((name, i) => {
  const product = products[(i + 3) % products.length];
  const items = [itemFrom(product.id, 1)];
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal >= 2000 ? 0 : 60;
  orders.push({
    id: `ord-new-${i + 1}`,
    orderNumber: `NS-${10472 + i}`,
    customerName: name,
    mobile: `010${String(20000000 + i * 211).slice(0, 8)}`,
    email: `customer.new${i + 1}@example.com`,
    governorate: ["Cairo", "Giza", "Alexandria", "Sharqia"][i % 4],
    city: ["Cairo", "Giza", "Alexandria", "Sharqia"][i % 4],
    address: `شارع ${i + 40}, مبنى ${i + 5}`,
    items,
    subtotal,
    discount: 0,
    shipping,
    total: subtotal + shipping,
    paymentMethod: (["cod", "card", "wallet", "instapay"] as const)[i % 4],
    status: (["new", "confirmed", "delivered", "shipped"] as const)[i % 4],
    createdAtISO: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
  });
});
