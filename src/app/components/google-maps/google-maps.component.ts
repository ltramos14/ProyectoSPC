import { Component, EventEmitter, Input, Output } from '@angular/core';


interface Distance {
  distance: string,
  time: string
}
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent {

  @Input() latitude: number;

  @Input() longitude: number;

  @Input() origin: string;

  @Input() destination: string;

  @Output() coodinaterChanged = new EventEmitter<google.maps.LatLngLiteral>();

  @Output() distanceCalculated = new EventEmitter<Distance>();

  center: google.maps.LatLngLiteral;

  markerOptions: google.maps.MarkerOptions = {draggable: true};

  constructor() {
    setTimeout(() => {
      if (this.latitude && this.longitude) {
        this.center = {
          lat: this.latitude,
          lng: this.longitude
        }
      }
    }, 200)
  }

  onChangeCoordinates(event: google.maps.MapMouseEvent): void {
    this.center = event.latLng.toJSON();
    this.coodinaterChanged.emit(this.center);
  }

  onCalculateDistance() {
    
  }


}
