"use client";
import { useRef } from "react";
import { create } from "../action";
import { useFormState, useFormStatus } from "react-dom";

export default function FormElement() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(create, null);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button
        className="bg-green-500 rounded-lg mt-2 text-white py-2"
        type="submit"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    );
  }

  return (
    <form
      className="flex flex-col"
      action={async (formData: FormData) => {
        formAction(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <input type="text" name="input" className="border p-1 border-gray-800" />
      <SubmitButton />

      <p className="text-red-500">{state as string}</p>
    </form>
  );
}
