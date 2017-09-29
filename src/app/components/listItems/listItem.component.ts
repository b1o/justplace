import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'list-item',
    templateUrl: 'listItem.component.html'
})

export class ListItemComponent implements OnInit {
    @Input() user;

    constructor() { }

    ngOnInit() { 

    }
}