import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { IFavorites } from '../../../shared/interfaces/favorites';

@Entity({ name: 'favorite' })
export class FavoriteEntity implements IFavorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true })
  artists: string[];

  @Column('uuid', { array: true })
  albums: string[];

  @Column('uuid', { array: true })
  tracks: string[];
}
