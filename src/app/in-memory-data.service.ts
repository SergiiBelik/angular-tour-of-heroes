import { Injectable } from '@angular/core';
import { InMemoryDB } from 'angular-in-memory-web-api';
import { Hero } from './hero'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  
  createDd(){
    const heroes: Hero[] = [
      {id: 11, name: 'test11'},
      {id: 12, name: 'test12'},
      {id: 13, name: 'test13'},
      {id: 14, name: 'test14'},
      {id: 15, name: 'test15'},
      {id: 16, name: 'test16'},
      {id: 17, name: 'test17'},
      {id: 18, name: 'test18'},
      {id: 19, name: 'test19'},
      {id: 20, name: 'test20'}
    ]
    return {heroes}
  }

  
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1: 11
  }

  constructor() { }
}
