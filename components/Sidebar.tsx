"use client";

import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "../constants";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathName = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href={"/"}
          className="flex mb-12 cursor-pointer items-center gap-2"
        >
          <Image
            className="size-[24] max-xl:size-14"
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map(({ imgURL, label, route }) => {
          const isActive =
            pathName === route || pathName.startsWith(`${route}/`);
          return (
            <Link
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
              key={route}
              href={route}
            >
              <div className="relative size-6">
                <Image
                  className={cn({ "brightness-[3] invert-0": isActive })}
                  src={imgURL}
                  alt={label}
                  fill
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} />
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
