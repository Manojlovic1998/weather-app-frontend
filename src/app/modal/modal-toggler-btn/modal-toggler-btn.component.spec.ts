import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTogglerBtnComponent } from './modal-toggler-btn.component';

describe('ModalTogglerBtnComponent', () => {
  let component: ModalTogglerBtnComponent;
  let fixture: ComponentFixture<ModalTogglerBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTogglerBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTogglerBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
