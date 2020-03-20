import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  onSubmit() {
    this.router.navigateByUrl('/summoner/' + this.searchForm.value.search);
  }

  get search() {
    return this.searchForm.get('search');
  }
}
