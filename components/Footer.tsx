import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push("/sign-in");
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.firstName[0]}{user?.lastName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-600">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>
      <div onClick={handleLogOut} className="footer_image">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image src={"icons/logout.svg"} fill alt="logout" />
            </TooltipTrigger>
            <TooltipContent className="bg-bankGradient">
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  );
};

export default Footer;
