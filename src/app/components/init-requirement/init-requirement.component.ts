import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-init-requirement',
    templateUrl: './init-requirement.component.html',
    styleUrls: ['./init-requirement.component.scss'],
})
export class InitRequirementComponent implements OnInit {

    @Input() public status: boolean = false;
    @Input() public label: string = "";
    @Input('message-true') public messageTrue: string = "";
    @Input('message-false') public messageFalse: string = "";

    constructor() { }
    ngOnInit() { }
}
