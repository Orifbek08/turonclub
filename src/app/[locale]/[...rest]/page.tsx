import { notFound } from "next/navigation";

/** Mavjud bo'lmagan har qanday manzil uchun 404 sahifasini ko'rsatadi */
export default function CatchAll() {
  notFound();
}
