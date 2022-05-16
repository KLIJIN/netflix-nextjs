import React, { useEffect, useState } from "react";
import { SearchIcon, BellIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import account from "../public/account.png";

export default function Header() {
  const [isScrolled, setIsScroled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroled(true);
      } else {
        setIsScroled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  return (
    <header className={`${isScrolled ? "bg-[#131313]" : ""}`}>
      <div className="flex items-center space-x-2 md:space-x-10 lg:px-10 lg:py-6 ">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden spase-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4  text-sm font-light">
        <SearchIcon className="hidden w-6 h-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="w-6 h-6" />
        <Link href="/account">
          <Image
            src={account}
            className="cursor-pointer rounded"
            alt="img"
            width={32}
            height={32}
          />
        </Link>
      </div>
    </header>
  );
}
