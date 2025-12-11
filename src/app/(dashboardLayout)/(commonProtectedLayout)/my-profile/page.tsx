import { getMeProfile } from "@/actions/profile/getMeProfile";
import { getUserInfo } from "@/actions/user/getUserInfo";
import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { IProfile } from "@/types/profile.types";
import { IUser } from "@/types/user.types";
import React from "react";

const MyProfilePage = async () => {
  const profile = await getMeProfile();
  const userData = await getUserInfo();
  return (
    <MyProfile
      profileData={profile.data as IProfile}
      userInfo={userData as IUser}
    />
  );
};

export default MyProfilePage;
