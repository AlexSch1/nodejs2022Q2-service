import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import db, {
//   ALBUMS_TABLE,
//   ARTISTS_TABLE,
//   InMemoryDB,
//   TRACKS_TABLE,
// } from '../../core/db';

@Injectable()
export class FavoritesService {
  // db: InMemoryDB;
  //
  // constructor() {
  //   this.db = db;
  // }
  //
  // async resetFavs() {
  //   return this.db.resetFavs();
  // }
  //
  // async findFavs() {
  //   const rawFavs = await this.db.getFavs();
  //
  //   const artists = await Promise.all(
  //     rawFavs.artists.map((id) => this.db.getEntity(ARTISTS_TABLE, id)),
  //   );
  //   const albums = await Promise.all(
  //     rawFavs.albums.map((id) => this.db.getEntity(ALBUMS_TABLE, id)),
  //   );
  //   const tracks = await Promise.all(
  //     rawFavs.tracks.map((id) => this.db.getEntity(TRACKS_TABLE, id)),
  //   );
  //
  //   return {
  //     artists,
  //     albums,
  //     tracks,
  //   };
  // }
  //
  // async addToFavouritesTrack(id: string) {
  //   const track = await this.db.getEntity(TRACKS_TABLE, id);
  //
  //   if (!track) {
  //     throw new HttpException(
  //       'Track not found',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //
  //   await this.db.addToFavourites(TRACKS_TABLE, id);
  //
  //   return 'Track added to favourites';
  // }
  //
  // async addToFavouritesAlbum(id: string) {
  //   const album = await this.db.getEntity(ALBUMS_TABLE, id);
  //
  //   if (!album) {
  //     throw new HttpException(
  //       'Album not found',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //
  //   await this.db.addToFavourites(ALBUMS_TABLE, id);
  //
  //   return 'Album added to favourites';
  // }
  //
  // async addToFavouritesArtist(id: string) {
  //   const artist = await this.db.getEntity(ARTISTS_TABLE, id);
  //
  //   if (!artist) {
  //     throw new HttpException(
  //       'Artist not found',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //
  //   await this.db.addToFavourites(ARTISTS_TABLE, id);
  //
  //   return 'Artist added to favourites';
  // }
  //
  // async removeTrackFromFavourites(id: string) {
  //   if (!this.db.hasFavs(TRACKS_TABLE, id)) {
  //     throw new HttpException(
  //       'Track was not find in favorites',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //
  //   await this.db.removeFromFavourites(TRACKS_TABLE, id);
  //
  //   return;
  // }
  // async removeAlbumFromFavourites(id: string) {
  //   if (!this.db.hasFavs(ALBUMS_TABLE, id)) {
  //     throw new HttpException(
  //       'Album was not find in favorites',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //
  //   await this.db.removeFromFavourites(ALBUMS_TABLE, id);
  //
  //   return;
  // }
  // async removeArtistFromFavourites(id: string) {
  //   if (!this.db.hasFavs(ARTISTS_TABLE, id)) {
  //     throw new HttpException(
  //       'Artist was not find in favorites',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //
  //   await this.db.removeFromFavourites(ARTISTS_TABLE, id);
  //
  //   return;
  // }
}
