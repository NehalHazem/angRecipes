import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  Categories;
  @Output() passCategoryData = new EventEmitter<any>();
  showCategory;

  // Check Which Component we are in Recipes or Recipe to Show Category Dropdown or Back Button.
  constructor(private service: RecipesService, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      if (e.url === '/') {
        this.showCategory = true;
      } else {
        this.showCategory = false;
      }
    });
  }

  ngOnInit() {
    this.getRecipesCategories();
  }

  // Category Dropdown.
  getRecipesCategories() {
    this.service.getRecipesCategories().subscribe((recipes: any) => {
      this.Categories = recipes.categories;
    });
  }

  // Send Output of Category Selected to Recipes Component.
  getCategoryVal(category) {
    this.service.getRecipesByCategory(category.innerHTML).subscribe((data: any) => {
      this.passCategoryData.emit(data.meals);
    });
  }

}
