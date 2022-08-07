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
  [USERS_TABLE]: IUser[] = [];
  [ARTISTS_TABLE]: Artist[] = [];
  [TRACKS_TABLE]: Track[] = [];
  [ALBUMS_TABLE]: Album[] = [];
  [FAVORITES_TABLE]: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  unrefIds(tableName: tableNames, id: string, resource: string) {
    this[tableName] = this[tableName].map((item) => {
      const dbResource = item[`${resource}Id`];

      if (dbResource !== id) {
        return item;
      }

      return {
        ...item,
        [`${resource}Id`]: null,
      };
    });
  }

  async resetFavs() {
    this[FAVORITES_TABLE] = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  async getFavs() {
    return this[FAVORITES_TABLE];
  }

  async addToFavourites(name: tableNames, id: string) {
    this[FAVORITES_TABLE][name].push(id);
  }

  hasFavs(name: tableNames, idToCheck: string): string {
    return this[FAVORITES_TABLE][name].includes(idToCheck);
  }

  async removeFromFavourites(name: tableNames, idToRemove: string) {
    this[FAVORITES_TABLE][name] = this[FAVORITES_TABLE][name].filter(
      (id) => id !== idToRemove,
    );
  }

  async getAllEntities<U extends tableTypes>(tableName: any): Promise<U[]> {
    return this[tableName];
  }

  async getEntity<U extends tableTypes>(
    tableName: any,
    idEntity: string,
  ): Promise<U | undefined> {
    return this[tableName].find(({ id }) => id === idEntity);
  }

  async createEntity(tableName: any, item: tableTypes): Promise<void> {
    this[tableName].push(item);
  }

  async updateEntity<U extends tableTypes>(
    tableName: any,
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

  async removeEntity(tableName: any, idEntity: string): Promise<void> {
    this[tableName] = this[tableName].filter(
      (dbUser) => dbUser.id !== idEntity,
    );
  }
}

const db = new InMemoryDB();

export default db;
