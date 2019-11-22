import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  CategoryVal;
  isHome: boolean;

  constructor(private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      if (e.url === '/') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    });
  }

  getCategoryData(e) {
    this.CategoryVal = e;
  }
}
