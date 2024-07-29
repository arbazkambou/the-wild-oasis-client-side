"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuestProfile,
} from "./data-service";
import { revalidatePath } from "next/cache";

export async function signinAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signoutAction() {
  await signOut({ redirectTo: "/" });
}

function response(errorState, message) {
  const data = {};
  data.error = errorState;
  data.message = message;
  return data;
}
function validateNationalID(id) {
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  return regex.test(id);
}

export async function updateGuest(formData) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You must be logged in!");
    }
    const x = formData.get("nationality");
    const [nationality, countryFlag] = x.split("%");
    const nationalID = formData.get("nationalID");
    if (!validateNationalID(nationalID)) {
      throw new Error("Please input valid national id");
    }
    const dataToUpdate = { nationality, countryFlag, nationalID };
    await updateGuestProfile(session.user.guestId, dataToUpdate);
    revalidatePath("/account/profile");
    return response(false, "Profile has been successfully updated!");
  } catch (error) {
    return response(true, error.message);
  }
}

export async function deleteReservation(bookingId) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You must be logged in!");
    }

    const guestBookings = await getBookings(session.user.guestId);

    const bookingIds = guestBookings.map((booking) => booking.id);

    if (!bookingIds.includes(bookingId)) {
      throw new Error("You can not delete that reservation!");
    }

    await deleteBooking(bookingId);

    revalidatePath("/account/reservations");

    return response(false, "Reservation has been deleted!");
  } catch (error) {
    return response(true, error.message);
  }
}

export async function updateReservation(formData) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You must be logged in!");
    }

    const { numGuests, observations, bookingId } = formData;

    const bookings = await getBookings(session.user.guestId);

    const bookingIds = bookings.map((booking) => booking.id);

    if (!bookingIds.includes(Number(bookingId))) {
      throw new Error("You can not update that reservation");
    }

    const dataToUpdate = { numGuests: Number(numGuests), observations };

    await updateBooking(Number(bookingId), dataToUpdate);

    revalidatePath(`/account/reservations/edit/${bookingId}`);

    revalidatePath("/account/reservations");

    return response(false, "Reservation has been updated!");
  } catch (error) {
    return response(true, error.message);
  }
  // redirect("/account/reservations");
}

export async function createReservation(dataToUpdate, formData) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You are not authroize to do this.");
    }
    const newBookingData = {
      ...dataToUpdate,
      guestId: session.user.guestId,
      numGuests: Number(formData.get("numGuests")),
      observations: formData.get("observations"),
      totalPrice: dataToUpdate.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      extrasPrice: 0,
      status: "unconfirmed",
    };

    await createBooking(newBookingData);
    revalidatePath(`/cabins/${dataToUpdate.cabinId}`);
    revalidatePath("/account/reservations");
  } catch (error) {
    return response(true, error.message);
  }
  redirect("/thankyou");
}
