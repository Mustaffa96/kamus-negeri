import { Negeri } from './entities/negeri.entity';

export const negeriProviders = [
  {
    provide: 'NEGERI_REPOSITORY',
    useValue: Negeri,
  },
];
