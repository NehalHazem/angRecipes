import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnChanges {

  Recipes;
  form: FormGroup;
  @Input() categoryData: any;
  badReq;
  storedRecipes;
  storedLetter;
  ngOnInitFired = false;
  Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
   'N', 'O', 'P', 'R', 'S', 'T', 'V', 'W', 'Y'];
  clearSearchInput;

  constructor(private service: RecipesService, private fb: FormBuilder) { }

  ngOnInit() {
    // to stop ngOnChange from running before ngOnInit
    this.ngOnInitFired = true;
    // to clear it's value for when we return to this page again
    this.categoryData = null;

    this.form = this.fb.group({
      showRecipe: ['A']
    });

    // Retrive Recipes Value from Local Storage If their was one, then Delete it from Storage.
    this.storedRecipes = JSON.parse(localStorage.getItem('Recipes'));
    if (this.storedRecipes !== null) {
      this.Recipes = this.storedRecipes;
      localStorage.removeItem('Recipes');
    } else {
      this.getRecipes();
    }

    // Retrive Letter Value from Local Storage If their was one, then Delete it from Storage.
    this.storedLetter = JSON.parse(localStorage.getItem('Letter'));
    if (this.storedRecipes !== null) {
      this.form.setValue({
        showRecipe: this.storedLetter
      });
      localStorage.removeItem('Letter');
    }
  }

  // Detect Change in Category from Navbar Component to Clear Letter List and Send to Search Component to Clear Search Input.
  ngOnChanges(changes: SimpleChanges) {
    if (!this.ngOnInitFired) {
      return;
    } else {
      if (changes.categoryData.currentValue === undefined) {
        return;
      } else {
        this.badReq = false;
        this.Recipes = changes.categoryData.currentValue;
        this.onClearSearchInput();
        setTimeout(() => {
          this.form.patchValue({
            showRecipe: ''
          });
        }, 100);
      }
    }
  }

  // Get Recipes by First Letter: A
  getRecipes() {
    const value = this.form.get('showRecipe').value;
    this.service.getRecipes(value).subscribe((recipes: any) => {
      this.badReq = false;
      this.Recipes = recipes.meals;
    });
  }

  // Detect Changes in Letters Dropdown.
  onClearSearchInput() {
    this.clearSearchInput = !this.clearSearchInput;
  }

  // Get Search Output from Search Component, then Clear Letters Select
  getSearchResults(e) {
    this.Recipes = e;
    this.form.setValue({
      showRecipe: ''
    });
    if (e === null) {
      this.badReq = true;
    } else {
      this.badReq = false;
    }
  }

  // Save Recipes and Letters to Storage
  saveRecipes() {
    localStorage.setItem('Recipes', JSON.stringify(this.Recipes));
    if (this.form.get('showRecipe').value !== '') {
      localStorage.setItem('Letter', JSON.stringify(this.form.get('showRecipe').value));
    }
  }

}
