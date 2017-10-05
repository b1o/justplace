import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html'
})

export class PaginationComponent implements OnInit {
    @Input() data;
    private allPages;
    private response;

    constructor() { }

    ngOnInit() { 
        this.response = this.data;
        this.allPages = Array(this.response.totalPages).fill(0);
        console.log(this.data)
    }
}