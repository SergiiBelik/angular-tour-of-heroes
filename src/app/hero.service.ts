import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }
  
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
  }
  
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_=> this.log(`fetched hero id: ${id}`)),
        catchError(this.errorHandler<Hero>(`getHero id=${id}`))
        )
  }
  
  
  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_=> this.log(`updated hero id: ${hero.id}`)),
      catchError(this.errorHandler<any>(`updateHero`))
      )
  }
  
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(_=>this.log(`added hero with id: ${hero.id}`)),
      catchError(this.errorHandler<Hero>('addHero'))
      )
  }
  
  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id
    const url = `${this.heroesUrl}/${id}`
    
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_=> this.log(`hero with id: ${id} has been deleted`)),
      catchError(this.errorHandler<Hero>('deleteHero'))
      )
  }
  
  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_=> this.log(`found heroes matching "${term}"`)),
      catchError(this.errorHandler<Hero[]>('searchHeroes', []))
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
