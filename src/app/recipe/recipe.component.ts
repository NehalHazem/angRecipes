import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../service/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipeId;
  recipeData;

  constructor(private service: RecipesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.recipeId = param.id;
    });
    this.getRecipeById();
  }

  getRecipeById() {
    this.service.getRecipeById(this.recipeId).subscribe((recipeData: any) => {
      this.recipeData = recipeData.meals;
    });
  }

}
