import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { RecipesService } from 'src/app/service/recipes.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  form: FormGroup;
  Results;
  storedSearch;
  @Output() sendSearchResults = new EventEmitter<any>();
  @Input() clearSearchInput;

  constructor(private service: RecipesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      searchVal: ['', Validators.required]
    });

    // Retrive Search Value from Local Storage If their was one, then Delete it from Storage.
    this.storedSearch = JSON.parse(localStorage.getItem('Search'));
    if (this.storedSearch !== null) {
      this.form.patchValue({
        searchVal: this.storedSearch
      });
      localStorage.removeItem('Search');
    }
  }

  // Detect If their is a Change from Letters Select Input to Clear Search Value.
  ngOnChanges(changes: SimpleChanges) {
    if (changes.clearSearchInput.currentValue !== undefined) {
      setTimeout(() => {
        this.form.patchValue({
          searchVal: ''
        });
      }, 100);
    }
  }

  // Send Search Request on Enter, then Send Output to Recipes Component.
  // Save Output in local Storage.
  onSearch(input, e) {
    if (e.keyCode === 13) {
      this.service.searchRecipes(input.value).subscribe((results: any) => {
        this.Results = results.meals;
        this.sendSearchResults.emit(this.Results);
      });
      localStorage.setItem('Search', JSON.stringify(input.value));
    }
  }

}
