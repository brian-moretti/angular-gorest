import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuComponent } from './sidebar-menu.component';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SidebarMenuComponent', () => {
  let component: SidebarMenuComponent;
  let fixture: ComponentFixture<SidebarMenuComponent>;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarMenuComponent, FooterComponent],
      imports: [ButtonModule],
    });
    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if showMenu convert the hideMenu property', () => {
    expect(component.hideMenu).toBeFalsy()
    component.showMenu()
    expect(component.hideMenu).toBeTruthy()
    component.showMenu()
    expect(component.hideMenu).toBeFalsy()
  });
});
