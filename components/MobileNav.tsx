"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264]">
      <Sheet>
        <SheetTrigger>
          <Image
            className="cursor-pointer"
            src={"/icons/hamburger.svg"}
            width={30}
            height={30}
            alt="menu"
          />
        </SheetTrigger>
        <SheetContent className="border-none bg-white" side={"left"}>
          <nav className="flex flex-col gap-4">
            <Link
              href={"/"}
              className="flex mb-12 cursor-pointer items-center gap-1 px-4"
            >
              <Image
                src={"/icons/logo.svg"}
                width={34}
                height={34}
                alt="Horizon logo"
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                Horizon
              </h1>
            </Link>
            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                  {sidebarLinks.map(({ imgURL, label, route }) => {
                    const isActive = pathName.startsWith(route);
                    return (
                      <SheetClose asChild>
                        <Link
                          className={cn("mobilenav-sheet_close w-full", {
                            "bg-bank-gradient": isActive,
                          })}
                          key={route}
                          href={route}
                        >
                          <Image
                            className={cn({
                              "brightness-[3] invert-0": isActive,
                            })}
                            src={imgURL}
                            alt={label}
                            width={20}
                            height={20}
                          />
                          <p
                            className={cn(
                              "text-16 font-semibold text-black-2",
                              {
                                "!text-white": isActive,
                              }
                            )}
                          >
                            {label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
              </SheetClose>
              <Footer user={user} type={"mobile"} />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
