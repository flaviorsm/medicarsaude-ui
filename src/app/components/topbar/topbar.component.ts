import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '@medicar/core/services';

@Component({
  selector: 'rts-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private authService: AutenticacaoService) { }

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
