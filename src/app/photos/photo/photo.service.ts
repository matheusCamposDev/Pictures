import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { catchError, map, of, throwError } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';

const API = enviroment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  listFromUser(userName: string) {
    return this.http.get<Photo[]>(`${API}${userName}/photos`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString())
    return this.http.get<Photo[]>(`${API}${userName}/photos`, { params });
  }

  upload(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(`${API}photos/upload`, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  findById(id: number) {
    return this.http.get<Photo>(`${API}photos/${id}`);
  }

  getComments(id: number) {
    return this.http.get<PhotoComment[]>(`${API}photos/${id}/comments`);
  }

  addComment(photoId: number, commentText: string) {
    return this.http.post(
      `${API}photos/${photoId}/comments`,
      { commentText }
    );
  }

  removePhoto(id: number) {
    return this.http.delete(`${API}photos/${id}`);
  }

  like(id: number) {
    return this.http.post(`${API}photos/${id}/like`, {}, { observe: 'response' })
      .pipe(map(res => true))
      .pipe(catchError(err => {
        return err.status == '304' ? of(false) : throwError(err);
      }));
  }
}
