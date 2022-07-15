import { IUser } from '../shared/interfaces/user';
import { Artist } from '../shared/interfaces/artist';
import { CreateArtistDto } from '../features/artists/dto/create-artist.dto';
import { CreateAlbumDto } from '../features/albums/dto/create-album.dto';
import { Album } from '../shared/interfaces/album';
import { CreateTrackDto } from '../features/tracks/dto/create-track.dto';
import { Track } from '../shared/interfaces/track';
import { Favorites } from '../shared/interfaces/favorites';

export const USERS_TABLE = 'users';
export const ARTISTS_TABLE = 'artists';
export const ALBUMS_TABLE = 'albums';
export const TRACKS_TABLE = 'tracks';
export const FAVORITES_TABLE = 'favorites';

export type tableNames =
  | typeof USERS_TABLE
  | typeof ARTISTS_TABLE
  | typeof ALBUMS_TABLE
  | typeof TRACKS_TABLE;

export type tableTypes =
  | IUser
  | Artist
  | CreateArtistDto
  | CreateAlbumDto
  | Album
  | CreateTrackDto
  | Track;

interface MyDb {
  users: IUser[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class InMemoryDB implements MyDb {
  [USERS_TABLE]: IUser[] = [
    {
      id: '2b6febbf-fcf1-412b-be44-9008c14fa694',
      login: 'login',
      password: '123',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
  [ARTISTS_TABLE]: Artist[] = [];
  [TRACKS_TABLE]: Track[] = [];
  [ALBUMS_TABLE]: Album[] = [];
  [FAVORITES_TABLE]: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

 async getFavs() {
    return this[FAVORITES_TABLE];
  }

  addToFavourites(name: tableNames, id: string) {
    this[FAVORITES_TABLE][name].push(id);
  }

  hasFavs(name: tableNames, idToCheck: string): string {
    return this[FAVORITES_TABLE][name].includes(idToCheck);
  }

  removeFromFavourites(name: tableNames, idToRemove: string) {
    this[FAVORITES_TABLE][name] = this[FAVORITES_TABLE][name].filter((id) => id !== idToRemove);
  }

  async getAllEntities<T extends tableNames, U extends tableTypes>(
    tableName: T,
  ): Promise<U[]> {
    // @ts-ignore
    return this[tableName];
  }

  async getEntity<T extends tableNames, U>(
    tableName: T,
    idEntity: string,
  ): Promise<U | undefined> {
    // @ts-ignore
    return this[tableName].find(({ id }) => id === idEntity);
  }

  async createEntity<T extends tableNames>(
    tableName: T,
    item: tableTypes,
  ): Promise<void> {
    // @ts-ignore
    this[tableName].push(item);
  }

  async updateEntity<T extends tableNames, U extends tableTypes>(
    tableName: T,
    user: U,
  ): Promise<U> {
    this[tableName] = this[tableName].map((dbUser) => {
      if (dbUser.id === user.id) {
        return {
          ...dbUser,
          ...user,
        };
      }

      return dbUser;
    });

    return user;
  }

  async removeEntity<T extends tableNames>(
    tableName: T,
    idEntity: string,
  ): Promise<void> {
    // @ts-ignore
    this[tableName] = this[tableName].filter(
      (dbUser) => dbUser.id !== idEntity,
    );
  }
}

const db = new InMemoryDB();

export default db;
