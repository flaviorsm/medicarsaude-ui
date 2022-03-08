import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '@medicar/core/services';

@Component({
  selector: 'rts-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AutenticacaoService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

}
