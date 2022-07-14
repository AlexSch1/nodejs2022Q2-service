import { IUser } from '../shared/interfaces/user';
import {Artist} from "../shared/interfaces/artist";
import {CreateArtistDto} from "../features/artists/dto/create-artist.dto";
import {CreateAlbumDto} from "../features/albums/dto/create-album.dto";
import {Album} from "../shared/interfaces/album";

export const USERS_TABLE = 'users';
export const ARTISTS_TABLE = 'artists';
export const ALBUM_TABLE = 'album';

export type tableNames = typeof USERS_TABLE | typeof ARTISTS_TABLE | typeof ALBUM_TABLE;
export type tableTypes = IUser | Artist | CreateArtistDto | CreateAlbumDto | Album;

interface MyDb {
  users: IUser[];
  artists: Artist[];
  album: Album[];
}
//
// type memoryDb = {
//   [key in tableNames]: tableTypes[]
// }
//
// const dbD: memoryDb = {
//   [USERS_TABLE]: [ ],
//   [ARTISTS_TABLE]: [],
// };


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
  [ALBUM_TABLE]: Album[] = [];

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
