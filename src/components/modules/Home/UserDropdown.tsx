"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import LogOutButton from "../Authentication/LogOutButton";
import { IProfile } from "@/types/profile.types";
import { IUser } from "@/types/user.types";

interface UserDropdownProps {
  profileInfo: IProfile;
  userInfo: IUser;
}

const UserDropdown = ({ userInfo, profileInfo }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {userInfo ? (
            <Avatar className="size-11">
              <AvatarImage src={profileInfo.profileImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <span className="text-sm font-semibold">
              {(profileInfo.fullName as string).charAt(0).toUpperCase()}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{profileInfo.fullName}</p>
            <p className="text-xs text-muted-foreground">{profileInfo.email}</p>
            <p className="text-xs text-primary capitalize">
              {userInfo.role.toUpperCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/my-profile"} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/change-password"} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600">
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
