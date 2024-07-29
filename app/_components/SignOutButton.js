"use client";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signoutAction } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function SignOutButton() {
  return (
    <form action={signoutAction}>
      <Button />
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
      disabled={pending}
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
      <span>{pending ? "Signing out..." : "Sign out"}</span>
    </button>
  );
}

export default SignOutButton;
