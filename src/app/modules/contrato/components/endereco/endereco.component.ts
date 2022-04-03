import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rts-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Input() endereco?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
