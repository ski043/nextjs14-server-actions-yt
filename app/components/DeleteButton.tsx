"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="border bg-red-400">
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
