import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, handleDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex sm:flex-row flex-col border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow sm:px-6 py-3 flex flex-col ">
        <div className="flex items-center justify-between">
          <h3 className="sm:text-xl sm:font-semibold text-sm">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase sm:text-xs sm:font-bold flex items-center text-xs rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase sm:text-xs sm:font-bold flex items-center text-xs rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="sm:text-lg text-sm text-primary-300 mt-4">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex sm:gap-5 gap-2 mt-4 items-baseline">
          <p className="sm:text-xl text-lg font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="text-primary-300">&bull;</p>
          <p className="sm:text-lg text-sm text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex sm:flex-col justify-between border-l border-primary-800 sm:w-[100px]">
        {!isPast(startDate) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} handleDelete={handleDelete} />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
