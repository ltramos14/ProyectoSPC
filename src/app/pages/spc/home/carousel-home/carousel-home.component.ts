import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.scss']
})
export class CarouselHomeComponent implements OnInit {
	
	responsiveOptions;

  images = [
    {"previewImageSrc": "../../../../../assets/img/1.png"},
    {"previewImageSrc": "../../../../../assets/img/2.png"},
    {"previewImageSrc": "../../../../../assets/img/3.png"},
    {"previewImageSrc": "../../../../../assets/img/4.png"}
  ]

	constructor() { 
		this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '768px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
	}

	ngOnInit() {

    }

}
