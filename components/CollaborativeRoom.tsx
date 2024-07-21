'use client';

import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { Editor } from '@/components/editor/Editor';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Loader from './Loader';
import Header from './Header';
import ActiveCollaborators from './ActiveCollaborators';

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className='collaborative-room'>
          <Header>
            <div className='flex w-fit items-center justify-center gap-2'>
              <p className='document-title'>This is a fake title</p>
            </div>
            <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
              <ActiveCollaborators />
            </div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
