export interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export type ITrackDto = Omit<ITrack, 'id'>;