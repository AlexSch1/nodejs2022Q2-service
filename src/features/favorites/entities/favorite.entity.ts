import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { IFavorites } from '../../../shared/interfaces/favorites';
import {TrackEntity} from "../../tracks/entities/track.entity";
import {AlbumEntity} from "../../albums/entities/album.entity";
import {ArtistEntity} from "../../artists/entities/artist.entity";

@Entity({ name: 'favorite' })
export class FavoriteEntity implements IFavorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, { cascade: true })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { cascade: true })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { cascade: true })
  @JoinTable()
  tracks: TrackEntity[];
}
