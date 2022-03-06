import { Component, OnInit } from '@angular/core';
import { AuthService } from '@medicar/modules/auth/_services';

@Component({
  selector: 'rts-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    const user = this.authService.currentUserValue;
    if (user) {
      return true;
    }
    return false;
  }
}
