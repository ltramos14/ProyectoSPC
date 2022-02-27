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

import icDone from "@iconify/icons-ic/twotone-done";
import icPlace from "@iconify/icons-ic/twotone-place";
import icClose from "@iconify/icons-ic/twotone-close";

import { Route } from "src/app/models/routes.model";
import { municipalities } from "src/static/municipalities-data";

@Component({
  selector: "spc-my-routes-create-update",
  templateUrl: "./my-routes-create-update.component.html",
  styleUrls: ["./my-routes-create-update.component.scss"],
})
export class MyRoutesCreateUpdateComponent implements OnInit {

  formRoute: FormGroup;
  mode: "create" | "update" = "create";

  // Íconos usados en la vista
  icDone = icDone;
  icClose = icClose;
  icPlace = icPlace;

  /**
   * Variable que especifica que teclas separan cada item de los chips
   */
  separatorKeysCodes = [ENTER, COMMA];

  // Variables para el chip de los municipios de las rutas
  municipalities = municipalities;
  muniname: string[] = [];
  filteredMunicipalities: Observable<string[]>;
  municipalitiesCtrl = new FormControl();
  route: string[] = [];

  // Variables para el chip de los días de servicio
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

  /**
   * Contructor del componente que inyecta las siguientes dependencias
   * @param defaults 
   * @param fb 
   * @param snackbar 
   * @param routesService 
   * @param dialogRef 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MyRoutesCreateUpdateComponent>
  ) {
    this.initFilters();
  }

  /**
   * Método que filtra los arreglos de días y municipios para usarlos en los chips
   */
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

  /**
   * Método se ejecuta una vez se crea este componente
   */
  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.mode = "create";
      this.defaults = {} as Route;
    }

    this.comprobateDefaultArrays();

    // Campos a del formulario
    this.formRoute = this.fb.group({
      id: [this.defaults.id || ""],
      serviceDays: [
        this.serviceDays || "",
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
        this.route || this.muniname,
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

  /**
   * Método que agrega la variable dependiendo del tipo al array mostrado en los chips
   * @param event 
   * @param isDay 
   */
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

  /**
   * Método que borrar la variable dependiendo del tipo al array mostrado en los chips
   * @param value 
   * @param isDay 
   */
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

  /**
   * Método que agrega el string al arreglo
   * @param event 
   * @param isDay 
   */
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

  /**
   * Método que enviar un valor que posea coincidencias según
   * lo solicitado en los autocomplete
   * @param value valor a filtrar en el autocomplete
   * @param isDay bandera para filtrar o el arreglo de días o de días de servicio
   * @returns 
   */
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
  
  /**
   * 
   * @param serviceDays 
   * @returns 
   */
  //TODO: Falta validar esto
  private validateServicesDays(serviceDays: FormControl) {
    if (serviceDays.value && serviceDays.value.length === 0) {
      return {
        validateServiceDays: { valid: false }
      }
    }
    return null;
  }

  /**
   * Método que valida si se desea edicar o crear una nueva ruta
   */
  save() {
    if (this.mode === "create") {
      this.createroute();
    } else if (this.mode === "update") {
      this.updateroute();
    }
  }

  /**
   * Método que crea una nueva ruta para el transportador en sesión
   */
  createroute() {
    let route = new Route();
    route = (this.formRoute.value) as Route;
    const {id , ...data} = route;
    this.dialogRef.close(data);
  }

  /**
   * Método que edita una ruta
   */
  updateroute() {
    let route = new Route();
    route = (this.formRoute.value) as Route;
    this.dialogRef.close(route);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  /**
   * Método qué agrega al array el municipio de origen seleccionado
   * @param value 
   */
  originPush(value: any) {
    if (this.formRoute.get('origin').value !== this.route[0]) {
      this.route.shift();
    }
    this.route.unshift(this.formRoute.get('origin').value);
  }

  /**
   * Método qué agrega al array el municipio de destino seleccionado
   * @param value 
   */
  destinationPush(value: any) {
    const last = this.route.length - 1;
    if (this.formRoute.get('destination').value === this.route[last]) {
      this.route.pop();
    }
    this.route.push(this.formRoute.get('destination').value);
  }

  /**
   * Método que valida si existen días se servicio o municipios de la ruta cuando se abre el diálogo
   */
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
