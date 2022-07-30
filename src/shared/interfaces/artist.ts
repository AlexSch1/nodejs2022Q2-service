export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export type IArtistDto = Omit<IArtist, 'id'>;
