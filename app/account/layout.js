import SideNavigation from "@/app/_components/SideNavigation";
import ReservationReminder from "../_components/ReservationReminder";
import { auth } from "../_lib/auth";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

export default function Layout({ children }) {
  return (
    <div className="grid sm:grid-cols-[16rem_1fr] grid-cols-[9rem_1fr] gap-2  h-full sm:gap-12">
      <SideNavigation />

      <div className="py-1">{children}</div>
      <ReservationReminder />
    </div>
  );
}
