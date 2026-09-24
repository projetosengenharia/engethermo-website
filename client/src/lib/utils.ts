import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setPageMeta(title: string, description: string) {
  document.title = title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);
}
