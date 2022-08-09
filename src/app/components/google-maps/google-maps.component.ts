import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent {

  @Input() latitude: number;

  @Input() longitude: number;

  @Output() coodinaterChanged = new EventEmitter<google.maps.LatLngLiteral>();

  center: google.maps.LatLngLiteral;

  markerOptions: google.maps.MarkerOptions = {draggable: true};

  constructor() {
    setTimeout(() => {
      this.center = {
        lat: this.latitude,
        lng: this.longitude
      }
    }, 200)
  }

  onChangeCoordinates(event: google.maps.MapMouseEvent): void {
    this.center = event.latLng.toJSON();
    this.coodinaterChanged.emit(this.center);
  }


}
