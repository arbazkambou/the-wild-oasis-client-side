import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center sm:gap-4 gap-2 z-10">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        src={logo}
        height="60"
        quality={100}
        width="60"
        alt="The Wild Oasis logo"
      />
      <span className="sm:text-xl sm:font-semibold text-sm text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
