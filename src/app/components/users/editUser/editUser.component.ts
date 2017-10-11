import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'edit-user',
    templateUrl: 'editUser.component.html'
})

export class EditUserComponent implements OnInit {
    @Input() user;
    
    constructor() { }

    ngOnInit() { }
}