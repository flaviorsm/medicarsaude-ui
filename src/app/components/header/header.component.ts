import { Component, OnInit } from '@angular/core';
import { AuthModel, RoleEnum } from '@medicar/core';
import { AutenticacaoService, TokenStorageService } from '@medicar/core/services';

@Component({
  selector: 'rts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;
  roleEnum = RoleEnum;
  regra?: RoleEnum;

  get usuario(): AuthModel | undefined {
    return this.tokenStorageService.getAuthLocalStorage() || undefined;
  }

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AutenticacaoService) {
      this.regra = this.tokenStorageService.getAuthLocalStorage()?.role;
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    console.log(this.user);

  }

}
