import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MessagesService } from "../services/messages.service";

@Component({
    standalone: true,
    selector: 'messages',
    imports: [CommonModule, ],
    templateUrl: './messages.component.html',
    styleUrls: [
        './messages.component.css'
    ],
})
export class MessagesComponent {
    constructor(
        public messagesService: MessagesService
    ) {

    }
}