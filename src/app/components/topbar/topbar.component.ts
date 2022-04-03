import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@medicar/core/services';

@Component({
  selector: 'rts-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    const auth = this.tokenStorageService.getAuthLocalStorage();
    if (auth) {
      return true;
    }
    return false;
  }
}
