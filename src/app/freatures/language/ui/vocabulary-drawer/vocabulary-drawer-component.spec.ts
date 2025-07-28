import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyDrawerComponent } from './vocabulary-drawer-component';

describe('VocabularyDrawerComponent', () => {
  let component: VocabularyDrawerComponent;
  let fixture: ComponentFixture<VocabularyDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabularyDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
