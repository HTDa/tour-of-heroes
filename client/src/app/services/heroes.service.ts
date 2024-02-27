import { Injectable } from "@angular/core";
import { Hero } from "../interface/hero.interface";
import { HEROES } from "../mock-heroes";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of, tap } from "rxjs";
import { handleError } from "../common/http-handle-errors";
import { MessagesService } from "./messages.service";


@Injectable({
    providedIn: 'root',
})
export class HeroesService {

    constructor(
        private http: HttpClient,
        private messagesService: MessagesService,
    ) {
        
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    
    getHeroes(): Observable<Hero[]> {
        let url = '/api/heroes'

        let heroes = this.http.get<Hero[]>(url)
            .pipe(catchError(handleError<Hero[]>('getHeroes', [])))
        this.log(`HeroesService: fetched heroes`)
        return heroes
    }

    getHero(id: number): Observable<Hero> {
        let url = `/api/heroes/hero/${id}`
        let hero = this.http.get<Hero>(url)
            .pipe(
                catchError(handleError<Hero>('getHero')),
            )
        this.log(`HeroesService: fetched hero`)
        return hero
    }

    updateHero(hero: Hero): Observable<any> {
        
        let url = `/api/heroes/hero/${hero.id}`
        return this.http.put(url, hero, this.httpOptions)
            .pipe(
                tap(_ => this.log(`HeroesService: update hero with id: ${hero.id}`)),
                catchError(handleError<any>('updateHero'))
            )
    }

    addHero(hero: Hero): Observable<Hero> {        
        let url = `/api/heroes/hero/-1`
        return this.http.post<Hero>(url, hero, this.httpOptions)
            .pipe(
                // tap((newHero: Hero) => console.log(`added hero with id: ${newHero.id}`)),
                tap(new_hero => this.log(`HeroesService: add hero with id: ${new_hero.id}`)),
                catchError(handleError<Hero>('addHero')),
            )
    }

    deleteHero(hero: Hero): Observable<Hero> {
        let url = `/api/heroes/hero/${hero.id}`
        return this.http.delete<Hero>(url, this.httpOptions)
            .pipe(
                // tap(_ => console.log(`deleted hero id: ${hero.id}`)),
                tap(_ => this.log(`HeroesService: delete hero with id: ${hero.id}`)),
                catchError(handleError<Hero>('deleteHero')),
            )
    }

    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            return of([])
        }
        let url = `/api/heroes/?name=${term}`
        return this.http.get<Hero[]>(url).pipe(
            // tap(x => x.length ? console.log(`found heroes matching ${term}`) : console.log(`no heroes matching ${term}`)),
            tap(x => x.length ? this.log(`found heroes matching ${term}`) : this.log(`no heroes matching ${term}`)),
            catchError(handleError<Hero[]>('searchHeroes', []))
        )
    }

    log(text: string) {
        this.messagesService.add(text)
    }
}