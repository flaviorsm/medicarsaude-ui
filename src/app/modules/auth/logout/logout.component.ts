import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services';

@Component({
  selector: 'rts-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(authService: AuthService) {
    authService.logout();
  }

  ngOnInit(): void {
  }

}
