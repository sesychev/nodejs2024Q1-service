import { v4 } from 'uuid';
import { Album } from '../interfaces/Album.interface';
import { NotFoundException } from 'src/common/common.errors';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/create-Album.dto';
import { TracksModel } from 'src/tracks/model/tracks.model';

export class ClassAlbum implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string;

  constructor(createAlbumDto: CreateAlbumDto) {
    this.id = v4();
    this.name = createAlbumDto.name;
    this.year = createAlbumDto.year;
    this.artistId = createAlbumDto.artistId;
  }
}

export class AlbumsModel {
  tracks = new TracksModel();

  private albums: Array<ClassAlbum> = [];

  public async findAll() {
    return this.albums;
  }

  public async findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException();
    return album;
  }

  public async post(dto: CreateAlbumDto) {
    const album = new ClassAlbum(dto);
    this.albums.push(album);
    return album;
  }

  public async put(id: string, dto: UpdateAlbumDto) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException();
    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;
    return album;
  }

  public async delete(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index < 0) throw new NotFoundException();

    await this.tracks.albumNull(id);

    this.albums.splice(index, 1);
  }
}
