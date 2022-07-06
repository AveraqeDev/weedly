import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";
import Image from "next/image";
import { getUserInitials } from "../utils/string";

const Profile: NextPage = withPageAuthRequired(({ user }) => {
  return (
    user && (
      <div>
        {user?.picture ? (
          <Image
            className="rounded-full"
            src={user.picture}
            alt=""
            width={32}
            height={32}
          />
        ) : (
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-lime-500">
            <span className="text-sm font-medium leading-none text-white">
              {getUserInitials(user.name ?? "Weedly User")}
            </span>
          </span>
        )}
        <h2>{user.name ?? "Weedly User"}</h2>
        <p>{user.email ?? "user@weedly.com"}</p>
      </div>
    )
  );
});

export default Profile;
