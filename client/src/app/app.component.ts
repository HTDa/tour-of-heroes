import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeroesListComponent } from './heroes/heroes-list.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet, 
        HeroesListComponent,
        MessagesComponent,
        RouterLink,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Tour of Heroes'
}
