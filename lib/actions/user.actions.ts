'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { parseStringify } from '../utils';
import { liveblocks } from '../liveblocks';

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });
    const users = data.map(
      ({ id, firstName, lastName, emailAddresses, imageUrl }) => ({
        id,
        name: `${firstName} ${lastName}`,
        email: emailAddresses[0].emailAddress,
        avatar: imageUrl,
      })
    );
    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if (text.length) {
      const lowerCaseText = text.toLowerCase();
      const filterUsers = users.filter((email: string) =>
        email.toLowerCase().includes(lowerCaseText)
      );
      return parseStringify(filterUsers);
    }
    return users;
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
};
