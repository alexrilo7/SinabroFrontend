import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonVolverInicioComponent } from './boton-volver-inicio.component';

describe('BotonVolverInicioComponent', () => {
  let component: BotonVolverInicioComponent;
  let fixture: ComponentFixture<BotonVolverInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonVolverInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonVolverInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
