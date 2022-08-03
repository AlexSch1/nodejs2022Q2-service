import { IArtist } from './artist';
import { IAlbum } from './album';
import { ITrack } from './track';

export interface IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export enum FavoritesEnum {
  Artists = 'artists',
  Albums = 'albums',
  Tracks = 'tracks',
}
