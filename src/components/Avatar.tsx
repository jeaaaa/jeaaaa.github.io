import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarImg() {
  return (
    <Avatar>
      <AvatarImage src="" alt="@jea" />
      <AvatarFallback>Jea</AvatarFallback>
    </Avatar>
  );
}
