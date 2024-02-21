import AvatarImg from "@/components/Avatar";
import Menu from "@/components/header/Menu";
import ModeToggle from "@/components/ModeToggle";
import { cn } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import { deviceStore } from "@/stores/deviceStore";

const Navbar = () => {
  const device = useStore(deviceStore);

  return (
    <div
      className={cn("flex h-14 justify-between items-center md:container", {
        "mx-4": device === "mobile",
      })}
    >
      <AvatarImg />
      {device === "desktop" ? (
        <>
          <Menu />
          <ModeToggle />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
