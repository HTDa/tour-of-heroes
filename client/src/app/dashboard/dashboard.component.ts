import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Hero } from "../interface/hero.interface";
import { HeroesService } from "../services/heroes.service";
import { RouterLink } from "@angular/router";
import { HeroSearchComponent } from "../hero-search/hero-search.component";

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        RouterLink,
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css', ],
})
export class DashboardComponent implements OnInit {
    constructor(
        private heroesService: HeroesService,
    ) {

    }
    
    heroes: Hero[] = []

    ngOnInit(): void {
        this.getHeroes()
    }

    getHeroes(): void {
        this.heroesService.getHeroes().subscribe(
            heroes => this.heroes = heroes.slice(1, 5)
        )
    }
}