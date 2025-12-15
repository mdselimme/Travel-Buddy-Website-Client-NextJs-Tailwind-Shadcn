import { getMeProfile } from "@/actions/profile/getMeProfile";
import { getAllTravelType } from "@/actions/travelType/getAllTravelType";
import { getUserInfo } from "@/actions/user/getUserInfo";
import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { IProfile } from "@/types/profile.types";
import { ITravelType } from "@/types/travel.type";
import { IUser } from "@/types/user.types";

const MyProfilePage = async () => {
  const profile = await getMeProfile();
  const userData = await getUserInfo();
  const travelTypes = await getAllTravelType();
  return (
    <MyProfile
      profileData={profile.data as IProfile}
      userInfo={userData as IUser}
      travelTypes={travelTypes.data as ITravelType[]}
    />
  );
};

export default MyProfilePage;
