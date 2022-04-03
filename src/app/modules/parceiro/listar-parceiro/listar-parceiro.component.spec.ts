import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarParceiroComponent } from './listar-parceiro.component';

describe('ListarParceiroComponent', () => {
  let component: ListarParceiroComponent;
  let fixture: ComponentFixture<ListarParceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarParceiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
