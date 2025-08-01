import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyListComponent } from './vocabulary-list-component';

describe('VocabularyListComponent', () => {
  let component: VocabularyListComponent;
  let fixture: ComponentFixture<VocabularyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabularyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
