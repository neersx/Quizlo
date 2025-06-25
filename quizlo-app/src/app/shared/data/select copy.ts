import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Person {
    id: string;
    name: string;

  }
  
  @Injectable({
    providedIn: 'root',
  })
  export class DataService {
    constructor(private http: HttpClient) {}
  
    getGithubAccounts(term: string) {
      if (term) {
        return this.http
          .get<any>(`https://api.github.com/search/users?q=${term}`)
          .pipe(map((rsp) => rsp.items));
      } else {
        return of([]);
      }
    }
  
    getAlbums() {
      return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');
    }
  
    getPhotos() {
      return this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos');
    }
  
    getPeople(term: string): Observable<Person[]> {
      let items = getMockPeople();
      if (term) {
        items = items.filter(
          (x) => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1
        );
      }
      return of(items).pipe(delay(500));
      
    }
  }

function getMockPeople() {
    return [
        {
            'id': '5a15b13c36e7a7f00cf0d7cb',
            'name':"Selection-1"
           
        },
        {
            'id': '5a15b13c2340978ec3d2c0ea',
            'name':"Selection-2"
        },
        {
          'id': '5a15b13c2340978ec3d2c0ea',
          'name':"Selection-3"
      },
        {
            'id': '5a15b13c663ea0af9ad0dae8',
            'name':"Selection-4"
        },
        {
          'id': '5a15b13c2340978ec3d2c0ea',
          'name':"Selection-5"
      },
       
    ]
}
