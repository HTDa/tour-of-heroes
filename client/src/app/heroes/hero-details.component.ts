import { CommonModule, Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "../interface/hero.interface";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Route } from "@angular/router";
import { HeroesService } from "../services/heroes.service";

@Component({
    standalone: true,
    selector: 'hero-details',
    imports: [CommonModule, FormsModule],
    templateUrl: './hero-details.component.html',
    styleUrls: ['./hero-details.component.css', ],
})
export class HeroDetailsComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private heroesService: HeroesService,
        private location: Location,
    ) {

    }

    hero: Hero

    ngOnInit(): void {
        this.getHero()
    }

    getHero() {
        this.route.paramMap.subscribe(
            params => {
                const id = +params.get('id')
                this.heroesService.getHero(id).subscribe(hero => this.hero = hero)
            }
        )
    }

    goBack() {
        this.location.back()
    }
    
    save(): void {
        if (this.hero) {
            this.heroesService.updateHero(this.hero)
                .subscribe(_ => this.goBack())    
        }
    }

    
}