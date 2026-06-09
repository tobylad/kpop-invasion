import { spawn } from 'bun';
import { join } from 'path';

const ROOT = join(import.meta.dir, '..');

const builder = spawn(
  ['bun', 'build', '--watch', 'src/main.tsx', '--outdir', 'dist', '--target', 'browser', '--sourcemap=inline'],
  { cwd: ROOT, stdout: 'inherit', stderr: 'inherit' }
);

// Give the initial build a moment before starting the server
await Bun.sleep(500);

const server = spawn(
  ['bun', '--hot', 'server/index.ts'],
  { cwd: ROOT, stdout: 'inherit', stderr: 'inherit' }
);

process.on('SIGINT', () => {
  builder.kill();
  server.kill();
  process.exit(0);
});

await Promise.all([builder.exited, server.exited]);
