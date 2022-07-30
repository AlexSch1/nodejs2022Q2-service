import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITrack } from '../../../shared/interfaces/track';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';

@Entity({ name: 'track' })
export class TrackEntity implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('int')
  duration: number;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @Column('uuid', { name: 'artistIdId', nullable: true })
  artistId: string | null;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  @Column('uuid', { name: 'albumIdId', nullable: true })
  albumId: string | null;
}
