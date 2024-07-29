"use client";

import { useForm } from "react-hook-form";
import { updateReservation } from "../_lib/actions";
import { Button } from "./Button";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

function UpdateReservationForm({ booking, cabin }) {
  const { handleSubmit, register, reset } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: updateReservation,
    onSettled: (res) => {
      if (res.error) {
        toast.error(res.message);
        reset();
      } else {
        toast.success(res.message);
      }
    },
  });
  function onSubmit(data) {
    mutate(data);
  }
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      //   action={updateReservation}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          defaultValue={booking.numGuests}
          required
          {...register("numGuests")}
          disabled={isPending}
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map(
            (x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            )
          )}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          {...register("observations")}
          disabled={isPending}
        >
          {booking.observations}
        </textarea>
      </div>

      <div className="flex justify-end items-center gap-6">
        <button
          className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update reservation"}
        </button>
      </div>
      <input type="hidden" value={booking.id} {...register("bookingId")} />
    </form>
  );
}

export default UpdateReservationForm;
