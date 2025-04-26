import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesServiceService {
  constructor(private _httpClient: HttpClient) {}

  getTrending(media_type: string = 'all'): Observable<any> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzg2Zjg5NjczY2EzM2Y3ZTVjYzJlODA1MGQ4MzA3ZCIsIm5iZiI6MTc0NTY5MjIxOS4zMzksInN1YiI6IjY4MGQyNjNiZjc2OWYwYWY2YTgwZWZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dks578G8gy8-kr8TKerSbCkLgO-bsk6S-tSeAic8yT4',
    });

    return this._httpClient.get(
      `https://api.themoviedb.org/3/trending/${media_type}/day?language=en-US`,
      { headers }
    );
  }

  getDetails(media_type: string = 'all', id: number): Observable<any> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzg2Zjg5NjczY2EzM2Y3ZTVjYzJlODA1MGQ4MzA3ZCIsIm5iZiI6MTc0NTY5MjIxOS4zMzksInN1YiI6IjY4MGQyNjNiZjc2OWYwYWY2YTgwZWZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dks578G8gy8-kr8TKerSbCkLgO-bsk6S-tSeAic8yT4',
    });
    return this._httpClient.get(
      `https://api.themoviedb.org/3/${media_type}/${id}`,
      { headers }
    );
  }
}
