import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { HeroesService } from "../services/heroes.service";
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { Hero } from "../interface/hero.interface";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-hero-search',
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
    ],
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {

    constructor (
        private heroesService: HeroesService,
    ) {

    }

    @Output() newHeroesEvent = new EventEmitter<Hero[]>()
    heroes$!: Hero[]
    private searchTerms = new Subject<string>()

    ngOnInit(): void {
        this.searchTerms.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap((term: string) => this.heroesService.searchHeroes(term))
        ).subscribe(
            heroes => this.newHeroesEvent.emit(heroes)
        )
    }

    search(term: string): void {
        this.searchTerms.next(term)
    }
}