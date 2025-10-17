import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const url = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(
    private http: HttpClient
  ) { }

  createPost(title: string, body: string): Observable<any> {
    try {
      return this.http.post<any>(url, { title, body });

    } catch (error) {
      return of('Request failed, please try again later.');
    }
    
  }

  // get the users in the JSON file
  getUsers(): Observable<any> {
    return this.http.get<any>("posts.json");
  }
}
