"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservation } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount } = cabin;

  const startDate = range.to;
  const endDate = range.from;
  const numNights = differenceInDays(startDate, endDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const dataToUpdate = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: cabin.id,
  };

  const createReservationWithData = createReservation.bind(null, dataToUpdate);
  const { mutate, isPending } = useMutation({
    mutationFn: createReservationWithData,
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
    <div className="sm:cale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/* <p>
        {String(range.from)} to {String(range.to)}
      </p> */}

      <form
        className="bg-primary-900 sm:py-10 sm:px-16 py-4 px-6 text-lg flex gap-5 flex-col"
        action={(formData) => {
          handleSubmit(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 sm:py-3 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>
          <button
            className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            disabled={(!startDate && !endDate) || isPending}
          >
            {isPending ? "Reserving..." : "Reserve now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
