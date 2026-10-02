import * as migration_20261002_162150_initial from './20261002_162150_initial';

export const migrations = [
  {
    up: migration_20261002_162150_initial.up,
    down: migration_20261002_162150_initial.down,
    name: '20261002_162150_initial'
  },
];
