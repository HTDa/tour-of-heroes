import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Hero } from "../interface/hero.interface";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HEROES } from "../mock-heroes";
import { HeroDetailsComponent } from "./hero-details.component";
import { HeroesService } from "../services/heroes.service";
import { MessagesService } from "../services/messages.service";
import { RouterLink } from "@angular/router";
import { HeroSearchComponent } from "../hero-search/hero-search.component";

@Component({
    standalone: true,
    selector: 'heroes',
    imports: [
        CommonModule, ReactiveFormsModule, FormsModule, 
        HeroDetailsComponent,
        RouterLink,
        HeroSearchComponent
    ],
    templateUrl: './heroes-list.component.html',
    styleUrls: ['./heroes-list.component.css', ],
})
export class HeroesListComponent implements OnInit {
    heroes: Hero[]

    constructor (
        private heroesService: HeroesService,
        private messagesService: MessagesService,
    ) {

    }

    ngOnInit(): void {
        this.getHeroes()        
    }

    getHeroes(): void {
        this.heroesService.getHeroes().subscribe(
            heroes => this.heroes = heroes
        )
    }

    add(name: string): void {
        name = name.trim()
        if (!name) return
        this.heroesService.addHero({ name } as Hero)
            .subscribe(hero => this.heroes.push(hero))
    }

    delete(hero: Hero) {
        let id = hero.id
        this.heroesService.deleteHero(hero).subscribe(
            _ => this.heroes = this.heroes.filter(h => h.id !== id)
        )
    }

    filteredHeroes(heroes: Hero[]) {
        if (!heroes.length) {
            this.getHeroes()
        }
        else {
            this.heroes = heroes
        }
    }

}