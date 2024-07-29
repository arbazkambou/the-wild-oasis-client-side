"use client";
import { signinAction } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function SignInButton() {
  return (
    <form action={signinAction}>
      <Button />
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium hover:bg-primary-700"
      disabled={pending}
    >
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      <span>{pending ? "Sigining in..." : "Continue with Google"}</span>
    </button>
  );
}

export default SignInButton;
