import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@medicar/core/services';

@Component({
  selector: 'rts-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
