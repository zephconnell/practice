import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Post } from './post';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseURL = 'http://localhost:3000/posts';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET fetch an array of all posts in order from newest to oldest */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL).pipe(
      tap(_ => this.messageService.log('fetched posts')),
      catchError(this.handleError<Post[]>('getPosts',[]))
    );
  }

  /** GET fetch a post with id */
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseURL}/${id}`).pipe(
      tap(_ => this.messageService.log('fetched posts')),
      catchError(this.handleError<Post>(`getPost w/ id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.log(`PostsService: ${message}`);
  }
}
