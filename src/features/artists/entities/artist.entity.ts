import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IArtist } from '../../../shared/interfaces/artist';

@Entity({ name: 'artist' })
export class ArtistEntity implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', default: false })
  grammy: boolean;
}
