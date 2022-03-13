import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlanoComponent } from './listar-plano.component';

describe('ListarPlanoComponent', () => {
  let component: ListarPlanoComponent;
  let fixture: ComponentFixture<ListarPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPlanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
