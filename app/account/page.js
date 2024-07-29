import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  return (
    <h2 className="font-semibold sm:backdrop:text-2xl text-xl text-accent-400 mb-7">
      Welcome, {session.user.name}
    </h2>
  );
}
