"use client";

import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState();
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  const { mutate, isPending } = useMutation({
    mutationFn: updateGuest,
    onSettled: (res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    },
  });

  function handleSubmit(data) {
    mutate(data);
  }

  return (
    <form
      className="bg-primary-900 sm:py-8 py-4  sm:px-12 px-4 text-lg flex gap-6 flex-col"
      action={(data) => handleSubmit(data)}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="px-5 sm:py-3 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          defaultValue={fullName}
          name="fullName"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="px-5  sm:py-3 py-2  bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 "
          defaultValue={email}
          name="email"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          className="px-5  sm:py-3 py-2  bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={nationalID}
        />
      </div>
      <button
        className="bg-accent-500 px-8 sm:py-3 py-3 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 "
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update reservation"}
      </button>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-end items-center gap-6">
      <button
        className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        disabled={pending}
      >
        {pending ? "Updating...." : "Update profile"}
      </button>
    </div>
  );
}
export default UpdateProfileForm;
