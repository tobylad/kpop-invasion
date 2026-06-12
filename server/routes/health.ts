import { countRows } from '../db';

export function handleHealth(): Response {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    db: {
      users: countRows('users'),
      bands: countRows('bands'),
      members: countRows('members'),
      releases: countRows('releases'),
    },
  });
}
