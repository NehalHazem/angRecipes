import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  URL = 'https://www.themealdb.com/api/json/v1/1';
  categoryData;

  constructor(private http: HttpClient) { }

  getRecipesCategories() {
    return this.http.get(`${this.URL}/categories.php`);
  }

  getRecipes(letterVal) {
    return this.http.get(`${this.URL}/search.php?f=${letterVal}`);
  }

  searchRecipes(value) {
    return this.http.get(`${this.URL}/search.php?s=${value}`);
  }

  getRecipesByCategory(value) {
    return this.http.get(`${this.URL}/filter.php?c=${value}`);
  }

  getRecipeById(id) {
    return this.http.get(`${this.URL}/lookup.php?i=${id}`);
  }

  // https://www.themealdb.com/api.php

}
