import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { catchError, map, type } from 'rxjs/operators';
import { MessageService } from './message.service';

 
  
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }
    
  private heroesUrl = 'api/heroes'

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }
  
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.errorHandler('getHeroes', []))
        )
      )
  }
  
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_=> this.log(`fetched hero id: ${id}`)),
        catchError(this.errorHandler<Hero>(`getHero id=${id}`))
        )
  }
  
  private errorHandler<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error)
      this.log(`${operation} caused an error: ${error.message}`)
      return of (result as T)
    }
  }
  
  
}
