import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { IFavorites } from '../../../shared/interfaces/favorites';
import {TrackEntity} from "../../tracks/entities/track.entity";
import {AlbumEntity} from "../../albums/entities/album.entity";
import {ArtistEntity} from "../../artists/entities/artist.entity";

@Entity({ name: 'favorite' })
export class FavoriteEntity implements IFavorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany<ArtistEntity>(() => ArtistEntity, (artist: ArtistEntity): string => artist.id, {
    cascade: true,
  })
  @Column('uuid', { array: true })
  artists: string[];

  @OneToMany<AlbumEntity>(() => AlbumEntity, (album: AlbumEntity): string => album.id, {
    cascade: true,
  })
  @Column('uuid', { array: true })
  albums: string[];

  @OneToMany<TrackEntity>(() => TrackEntity, (track: TrackEntity): string => track.id, {
    cascade: true,
  })
  @Column('uuid', { array: true })
  tracks: string[];
}
