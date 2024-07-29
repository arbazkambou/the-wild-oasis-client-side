"use client";

import toast from "react-hot-toast";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) =>
      curBookings.filter((curBooking) => curBooking.id !== bookingId)
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    toast.success("Reservation has been deleted!");
    await deleteReservation(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
