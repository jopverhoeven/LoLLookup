import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LoLLookup';
  hideNavbar = false;

  constructor(public router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (e.url === '/') {
          this.hideNavbar = true;
        } else {
          this.hideNavbar = false;
        }
      }
    });
  }
}
