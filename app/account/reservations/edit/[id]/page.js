import { Button } from "@/app/_components/Button";
import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  // CHANGE
  const booking = await getBooking(params.id);
  const cabin = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{params.id}
      </h2>
      <UpdateReservationForm booking={booking} cabin={cabin} />
    </div>
  );
}
