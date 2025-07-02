import { Kamus } from './entities/kamus.entity';

export const kamusProviders = [
  {
    provide: 'KAMUS_REPOSITORY',
    useValue: Kamus,
  },
];
