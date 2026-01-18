import { getMeProfile } from "@/actions/profile/getMeProfile";
import { getUserInfo } from "@/actions/user/getUserInfo";
import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { IProfile } from "@/types/profile.types";
import { ITravelType } from "@/types/travel.type";
import { IUser } from "@/types/user.types";
import { Metadata } from "next";
import { getAllTravelTypeUsers } from "../../../../actions/travelType/getAllTravelTypeUsers";

export const metadata: Metadata = {
  title: `My Profile || Travel Buddy`,
  description:
    "Travel Buddy My Profile Page to view and edit your profile information.",
};

const MyProfilePage = async () => {
  const profile = await getMeProfile();
  const userData = await getUserInfo();
  const travelTypes = await getAllTravelTypeUsers();
  return (
    <MyProfile
      profileData={profile.data as IProfile}
      userInfo={userData as IUser}
      travelTypes={travelTypes as ITravelType[]}
    />
  );
};

export default MyProfilePage;
