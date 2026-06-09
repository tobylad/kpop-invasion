import { db } from '../db';

export function handleHealth(): Response {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    db: {
      bands: db.data.bands.length,
      members: db.data.members.length,
      releases: db.data.releases.length,
      gameState: db.data.gameState ? 'loaded' : 'empty',
    },
  });
}
