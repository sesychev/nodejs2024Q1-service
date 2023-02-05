import { Album } from 'src/albums/interfaces/album.interface';
import { ClassAlbum } from 'src/albums/model/albums.model';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { ClassArtist } from 'src/artists/model/artists.model';
import { Track } from 'src/tracks/interfaces/track.interface';
import { ClassTrack } from 'src/tracks/model/tracks.model';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
