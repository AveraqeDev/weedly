import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";
import Image from "next/image";

type ProfileProps = {
  user: UserProfile;
};

const Profile: NextPage<ProfileProps> = ({ user }) => {
  return (
    user && (
      <div>
        {user.picture && (
          <Image
            src={user.picture}
            alt={user.name || ""}
            height={50}
            width={50}
          />
        )}
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Profile;
