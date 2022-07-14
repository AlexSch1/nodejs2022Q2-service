import { IUser } from '../shared/interfaces/user';

export const USERS_TABLE = 'users';

type tableNames = typeof USERS_TABLE;
type tableTypes = IUser;

interface MyDb {
  users: IUser[];
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

  async getAllEntities<T extends tableNames>(
    tableName: T,
  ): Promise<tableTypes[]> {
    return this[tableName];
  }

  async getEntity<T extends tableNames>(
    tableName: T,
    idEntity: string,
  ): Promise<tableTypes | undefined> {
    return this[tableName].find(({ id }) => id === idEntity);
  }

  async createEntity<T extends tableNames>(
    tableName: T,
    item: tableTypes,
  ): Promise<void> {
    this[tableName].push(item);
  }

  async updateEntity<T extends tableNames>(
    tableName: T,
    user: tableTypes,
  ): Promise<tableTypes> {
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
    this[tableName] = this[tableName].filter(
      (dbUser) => dbUser.id !== idEntity,
    );
  }
}

const db = new InMemoryDB();

export default db;
