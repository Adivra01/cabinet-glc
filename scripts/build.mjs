import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');
const files = [
  'index.html',
  'consultants.html',
  'contact.html',
  'prestations.html',
  'services.html',
  'assets',
  'services',
];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of files) {
  cpSync(resolve(root, file), resolve(output, file), { recursive: true });
}

console.log(`Site statique prêt dans ${output}`);
