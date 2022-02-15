import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../Models/game.model';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private HttpClient: HttpClient) { }

      getGamelist(ordering: string, search?: string) : Observable<APIResponse<Game>> {
        let parms = new HttpParams().set('ordering', ordering);
        if(search){
          parms = new HttpParams().set('ordering', ordering).set('search', search)
        }
        return this.HttpClient.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{
          params: parms,
        });
      }

      //Multiple Get Methods in the same Function
      getGameDetails(id: string): Observable<Game> {
        const gameInfoRequest = this.HttpClient.get(`${env.BASE_URL}/games/${id}`);
        const gameTrailersRequest = this.HttpClient.get(`${env.BASE_URL}/games/${id}/movies`);
        const gameScreenshotsRequest = this.HttpClient.get(`${env.BASE_URL}/games/${id}/screenshots`);

        // Handle multiple API requests in Angular using 1) mergeMap and 2) forkJoin to retraive all methods and combine them into one
        // to avoid nested subscriptions.

        return forkJoin({
          gameInfoRequest,
          gameScreenshotsRequest,
          gameTrailersRequest,
        }).pipe(
          map((resp: any) => {
            return {
              ...resp['gameInfoRequest'],
              screenshots: resp['gameScreenshotsRequest']?.results,
              trailers: resp['gameTrailersRequest']?.results,
            };
          })
        );
      }

}
