import { User } from "@/app/state/types";
import Image from "next/image";
import React from "react";
import { UserImg } from '../../contants';

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center rounded border p-4 shadow gap-3">
      {user.profilePictureUrl && (
        <Image
            src={UserImg}  
            alt="profile picture"
          width={64}
          height={16}
          className="rounded-full"
          unoptimized={true}
        />
      )}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;