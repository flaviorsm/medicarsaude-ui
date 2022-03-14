import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarColaboradorComponent } from './listar-colaborador.component';

describe('ListarColaboradorComponent', () => {
  let component: ListarColaboradorComponent;
  let fixture: ComponentFixture<ListarColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
