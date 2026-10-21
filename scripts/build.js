const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const outputDirectory = path.join(__dirname, '..', 'public');
const tailwindCli = require.resolve('tailwindcss/lib/cli.js');

fs.mkdirSync(outputDirectory, { recursive: true });

const build = spawnSync(
  process.execPath,
  [
    tailwindCli,
    '-i',
    './tailwind.input.css',
    '-o',
    './public/styles.css',
    '--minify'
  ],
  { cwd: path.join(__dirname, '..'), stdio: 'inherit' }
);

if (build.error) {
  throw build.error;
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

fs.copyFileSync(
  path.join(__dirname, '..', 'safi.html'),
  path.join(outputDirectory, 'index.html')
);
