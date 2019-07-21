import {Component, Input, OnInit} from '@angular/core';
import {User} from '../general_files/user.model';

@Component({
  selector: 'show-user-info',
  templateUrl: './show-user-info.component.html',
  styleUrls: ['./show-user-info.component.css']
})
export class ShowUserInfoComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}