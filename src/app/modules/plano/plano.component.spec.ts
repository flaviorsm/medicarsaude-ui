import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoComponent } from './plano.component';

describe('PlanoComponent', () => {
  let component: PlanoComponent;
  let fixture: ComponentFixture<PlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
