import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDetails, UsersResponse } from '../models/users.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService {

  #http = inject(HttpClient)
  

  public getUsers(search: string): Observable<UsersResponse> {
    let queryParameters = new HttpParams;

    if (search !== undefined && search !== null) {
      queryParameters = queryParameters.set('q', search);
    }
    queryParameters = queryParameters.set('per_page', '20');


    return this.#http.get<UsersResponse>('https://api.github.com/search/users',
      {params: queryParameters}
    )
  }

  public getUser(user_id: string): Observable<UserDetails> {
    return this.#http.get<UserDetails>(`https://api.github.com/user/${user_id}`)
  }
}