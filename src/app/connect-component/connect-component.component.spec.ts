import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectComponentComponent } from './connect-component.component';

describe('ConnectComponentComponent', () => {
  let component: ConnectComponentComponent;
  let fixture: ComponentFixture<ConnectComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
