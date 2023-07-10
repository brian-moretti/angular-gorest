import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/firebase.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
})
export class SidebarMenuComponent implements OnInit {
  account!: Account;
  now = new Date

  ngOnInit(): void {
    this.account = JSON.parse(localStorage.getItem('Account')!);
  }

  hideMenu: boolean = false;

  showMenu() {
    this.hideMenu = !this.hideMenu;
  }
}
