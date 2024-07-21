'use client';

import Loader from '@/components/Loader';
import { getClerkUsers } from '@/lib/actions/user.actions';
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from '@liveblocks/react/suspense';

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <LiveblocksProvider
      authEndpoint={'/api/liveblocks-auth'}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
