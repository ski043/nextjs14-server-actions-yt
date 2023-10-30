import Image from "next/image";
import prisma from "./db";
import { revalidatePath } from "next/cache";

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      input: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Home() {
  const data = await getData();
  async function create(formData: FormData) {
    "use server";

    const input = formData.get("input") as string;

    await prisma.todo.create({
      data: {
        input: input,
      },
    });

    revalidatePath("/");
  }

  async function edit(formData: FormData) {
    "use server";

    const input = formData.get("input") as string;
    const inputId = formData.get("inputId") as string;

    await prisma.todo.update({
      where: {
        id: inputId,
      },
      data: {
        input: input,
      },
    });

    revalidatePath("/");
  }

  async function deleteItem(formData: FormData) {
    "use server";

    const inputId = formData.get("inputId") as string;

    await prisma.todo.delete({
      where: {
        id: inputId,
      },
    });

    revalidatePath("/");
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
        <form className="flex flex-col" action={create}>
          <input
            type="text"
            name="input"
            className="border p-1 border-gray-800"
          />
          <button
            className="bg-green-500 rounded-lg mt-2 text-white py-2"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="mt-5 flex flex-col gap-y-2">
          {data.map((todo) => (
            <form key={todo.id} className="flex" action={edit}>
              <input type="hidden" name="inputId" value={todo.id} />
              <input
                type="text"
                name="input"
                defaultValue={todo.input}
                className="border p-1"
              />

              <button type="submit" className="border bg-green-400 ">
                Save
              </button>
              <button formAction={deleteItem} className="border bg-red-400">
                Delete
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
