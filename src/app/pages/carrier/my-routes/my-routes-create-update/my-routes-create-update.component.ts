import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import icDone from "@iconify/icons-ic/twotone-done";
import icPlace from "@iconify/icons-ic/twotone-place";
import icClose from "@iconify/icons-ic/twotone-close";

import { Route } from "src/app/models/routes.model";
import { RoutesService } from "src/app/service/carrier/routes.service";
import { municipalities } from "src/static/municipalities-data";

@Component({
  selector: "spc-my-routes-create-update",
  templateUrl: "./my-routes-create-update.component.html",
  styleUrls: ["./my-routes-create-update.component.scss"],
})
export class MyRoutesCreateUpdateComponent implements OnInit {

  formRoute: FormGroup;
  mode: "create" | "update" = "create";

  // icSpa = icSpa;
  icDone = icDone;
  icClose = icClose;
  icPlace = icPlace;

  separatorKeysCodes = [ENTER, COMMA];

  municipalities = municipalities;
  muniname: string[] = [];
  filteredMunicipalities: Observable<string[]>;
  municipalitiesCtrl = new FormControl();
  route: string[] = [];

  weekDays: string[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  filteredDays: Observable<string[]>;
  fruitCtrl = new FormControl();
  serviceDays: string[] = [];

  @ViewChild("dayInput") dayInput: ElementRef<HTMLInputElement>;
  @ViewChild("municipalityInput")
  municipalityInput: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private routesService: RoutesService,
    private dialogRef: MatDialogRef<MyRoutesCreateUpdateComponent>
  ) {
    this.initFilters();
  }

  initFilters() {
    municipalities.forEach(({ name }) => this.muniname.push(name));
    this.filteredDays = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((day: string | null) =>
        day ? this._filter(day, true) : this.weekDays.slice()
      )
    );
    this.filteredMunicipalities = this.municipalitiesCtrl.valueChanges.pipe(
      startWith(null),
      map((muni: string | null) =>
        muni ? this._filter(muni, false) : this.muniname.slice()
      )
    );
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.mode = "create";
      this.defaults = {} as Route;
    }

    this.comprobateDefaultArrays();

    this.formRoute = this.fb.group({
      id: [this.defaults.id || ""],
      serviceDays: [
        this.serviceDays || "",
        this.validateServicesDays
      ],
      origin: [
        this.defaults.origin || "",
        Validators.required,
      ],
      destination: [
        this.defaults.destination || "",
        Validators.required,
      ],
      routes: [
        this.defaults.routes || this.muniname,
        Validators.required,
      ],
      startHour: [
        this.defaults.startHour || "",
        [
          Validators.required,
          Validators.pattern('((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))')
        ],
      ]
    });
  }

  add(event: MatChipInputEvent, isDay: boolean): void {
    const value = (event.value || "").trim();

    if (value) {
      if (isDay) {
        this.serviceDays.push(value);
      } else if (!isDay) this.route.push(value);
    }

    if (event.input) {
      event.input.value = "";
    }

    this.fruitCtrl.setValue(null);
    this.municipalitiesCtrl.setValue(null);
  }

  remove(value: string, isDay: boolean): void {
    if (isDay) {
      const index = this.serviceDays.indexOf(value);
      if (index >= 0) {
        this.serviceDays.splice(index, 1);
      }
    } else if (!isDay) {
      const index = this.route.indexOf(value);
      if (index >= 0) {
        this.route.splice(index, 1);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent, isDay: boolean): void {
    if (isDay) {
      if (!this.serviceDays.includes(event.option.viewValue)) {
        this.serviceDays.push(event.option.viewValue);
      }

      this.dayInput.nativeElement.value = "";
      this.fruitCtrl.setValue(null);
    } else if (!isDay) {
      this.route.push(event.option.viewValue);
      this.municipalityInput.nativeElement.value = "";
      this.municipalitiesCtrl.setValue(null);
    }
  }

  private _filter(value: string, isDay: boolean): string[] {
    const filterValue = value.toLowerCase();
    if (isDay)
      return this.weekDays.filter((fruit) =>
        fruit.toLowerCase().includes(filterValue)
      );
    else if (!isDay) {
      return this.muniname.filter((name) =>
        name.toLowerCase().includes(filterValue)
      );
    }
  }

  private validateServicesDays(serviceDays: FormControl) {
    if (serviceDays.value && serviceDays.value.length === 0) {
      return {
        validateServiceDays: { valid: false }
      }
    }
    return null;
  }

  save() {
    if (this.mode === "create") {
      this.createroute();
    } else if (this.mode === "update") {
      this.updateroute();
    }
  }

  createroute() {
    let route = new Route();
    
    const { origin, destination, startHour } = this.formRoute.value;
    
    route.origin = origin;
    route.destination = destination;
    route.startHour = startHour;
    route.route = this.route;
    route.serviceDays = this.serviceDays;

    this.routesService.saveRoute(null, route).then(() => {
      this.snackbar.open("Ruta agregada satisfactoriamente", "OK", {
        duration: 3000,
      });
    });

    this.dialogRef.close();
  }

  updateroute() {
    let route = new Route();

    this.routesService.saveRoute(route.id, route).then(() => {
      this.snackbar.open("Ruta editada satisfactoriamente", "OK", {
        duration: 3000,
      });
    });

    this.dialogRef.close();
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  originPush(value: any) {
    if (this.formRoute.get('origin').value !== this.route[0]) {
      this.route.shift();
    }
    this.route.unshift(this.formRoute.get('origin').value);
  }

  destinationPush(value: any) {
    const last = this.route.length - 1;
    if (this.formRoute.get('destination').value === this.route[last]) {
      this.route.pop();
    }
    this.route.push(this.formRoute.get('destination').value);
  }

  private comprobateDefaultArrays() {

    if (this.defaults.serviceDays) {
      for (let i = 0; i < this.defaults.serviceDays.length; i++)
        this.serviceDays.push(this.defaults.serviceDays[i]);
    }
    
    if (this.defaults.route) {
      for (let i = 0; i < this.defaults.route.length; i++)
        this.route.push(this.defaults.route[i]);
    }

  }
  
}
