import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAlbum } from '../../../shared/interfaces/album';
import { ArtistEntity } from '../../artists/entities/artist.entity';

@Entity({ name: 'album' })
export class AlbumEntity implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('int')
  year: number;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @Column('uuid', { name: 'artistId', nullable: true })
  artistId: string | null;
}
