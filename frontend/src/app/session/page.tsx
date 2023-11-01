'use client';

import { useSearchParams } from 'next/navigation';

function SessionResult() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('id');

  return (
    <div>
      <h1>My Page</h1>
      <p>Slug: {sessionId}</p>
    </div>
  );
}

export default SessionResult;
