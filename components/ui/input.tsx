"use client";
import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="border border-gray-300 rounded px-3 py-2 text-sm"
      {...props}
    />
  );
}
