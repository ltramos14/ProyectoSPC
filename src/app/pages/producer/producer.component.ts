import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ["./producer.component.css"],
})

export class ProducerComponent implements OnInit {

  visibleSidebar;

  constructor() { }

  ngOnInit(): void {
    this.visibleSidebar = true;
  }

}
