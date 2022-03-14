import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@medicar/core/services';

@Component({
  selector: 'rts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get nomeUsuario(): string {
    const auth = this.tokenStorageService.getAuthLocalStorage();
    return auth ? auth.username : '';
  }

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
  }

}
