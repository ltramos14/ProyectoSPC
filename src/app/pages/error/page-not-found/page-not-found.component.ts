import { Component, OnInit } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';

@Component({
  selector: 'vex-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  icSearch = icSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
