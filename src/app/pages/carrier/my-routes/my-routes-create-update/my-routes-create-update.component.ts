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
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { Route } from "src/app/models/routes.model";
import { municipalities } from "src/static/municipalities-data";

import icClose from "@iconify/icons-ic/twotone-close";
import icDay from "@iconify/icons-ic/twotone-today";
import icDone from "@iconify/icons-ic/twotone-done";
import icPlace from "@iconify/icons-ic/twotone-place";
import icTime from "@iconify/icons-ic/twotone-alarm";
import icWhere from "@iconify/icons-ic/twotone-where-to-vote";

@Component({
  selector: "spc-my-routes-create-update",
  templateUrl: "./my-routes-create-update.component.html",
})
export class MyRoutesCreateUpdateComponent implements OnInit {

  /**
   * Se instancian los íconos utilizados en la vista
   */
  icClose = icClose;
  icDay = icDay;
  icDone = icDone;
  icPlace = icPlace;
  icTime = icTime;
  icWhere = icWhere;

  /**
   * 
   */
  mode: "create" | "update" = "create";

  /**
   * 
   */
  formRoute: FormGroup;

  /**
 * Variable que especifica que teclas separan cada item de los chips
 */
  separatorKeysCodes = [ENTER, COMMA];

  /**
   * 
   */
  addOnBlur = true;

  /**
   * Variables para el chip de los días de servicio
   */
  weekDays: string[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  /**
   * Variables para el chip de los municipios de las rutas
   */
  municipalities = municipalities;

  /**
   * 
   */
  municipalitiesCtrl = new FormControl();

  /**
   * 
   */
  municipalityName: string[] = [];

  /** 
   * 
  */
  filteredMunicipalities: Observable<string[]>;

  /**
   * 
   */
  route: string[] = [];


  @ViewChild("municipalityInput") municipalityInput: ElementRef<HTMLInputElement>;

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
   * Método que filtra el arreglo de municipios para usarlos en los chips
   */
  initFilters() {
    municipalities.forEach(({ name }) => this.municipalityName.push(name));

    this.filteredMunicipalities = this.municipalitiesCtrl.valueChanges.pipe(
      startWith(null),
      map((muni: string | null) =>
        muni ? this._filter(muni) : this.municipalityName.slice()
      )
    );
  }

  /**
   * Método se ejecuta una vez se crea este componente
   */
  ngOnInit() {

    console.log(this.defaults);
    

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
      origin: [
        this.defaults.origin || "",
        Validators.required
      ],
      destination: [
        this.defaults.destination || "",
        Validators.required
      ],
      startHour: [
        this.defaults.startHour || "",
        [
          Validators.required,
          Validators.pattern("((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))"),
        ],
      ],
      serviceDays: [
        this.defaults.serviceDays || "",
        Validators.required
      ],
      routes: [this.route || ""],
    });
  }

  /**
   * Método que agrega la variable dependiendo del tipo al array mostrado en los chips
   * @param event
   */
  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (value) {
      this.route.push(value);
    }
    if (event.input) {
      event.input.value = "";
    }
    this.municipalitiesCtrl.setValue(null);
  }

  /**
   * Método que borrar la variable dependiendo del tipo al array mostrado en los chips
   * @param value
   */
  remove(value: string): void {
    const index = this.route.indexOf(value);
    if (index >= 0) {
      this.route.splice(index, 1);
    }
  }

  /**
   * Método que agrega el string al arreglo
   * @param event
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.route.push(event.option.viewValue);
    this.municipalityInput.nativeElement.value = "";
    this.municipalitiesCtrl.setValue(null);
  }

  /**
   * Método que enviar un valor que posea coincidencias según
   * lo solicitado en los autocomplete
   * @param value valor a filtrar en el autocomplete
   * @returns
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.municipalityName.filter((name) =>
      name.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Método qué agrega al array el municipio de origen seleccionado
   * @param value
   */
  originPush(value: any) {
    if (this.formRoute.get("origin").value !== this.route[0]) {
      this.route.shift();
    }
    this.route.unshift(this.formRoute.get("origin").value);
  }

  /**
   * Método qué agrega al array el municipio de destino seleccionado
   * @param value
   */
  destinationPush(value: any) {
    const last = this.route.length - 1;
    if (this.formRoute.get("destination").value === this.route[last]) {
      this.route.pop();
    }
    this.route.push(this.formRoute.get("destination").value);
  }

  /**
   * Método que valida si existen días se servicio o municipios de la ruta cuando se abre el diálogo
   */
  private comprobateDefaultArrays() {
    if (this.defaults.routes) {
      for (let i = 0; i < this.defaults.routes.length; i++)
        this.route.push(this.defaults.routes[i]);
    }
  }

  /**
   * Método que crea una nueva ruta para el transportador en sesión
   */
  createroute() {
    let route = new Route();
    route = this.formRoute.value as Route;
    const { id, ...data } = route;
    this.dialogRef.close(data);
  }

  /**
   * Método que edita una ruta
   */
  updateroute() {
    let route = new Route();
    route = this.formRoute.value as Route;
    this.dialogRef.close(route);
  }

  /**
 * Método que valida si se desea edicar o crear una nueva ruta
 */
  saveChanges() {
    if (this.mode === "create") {
      this.createroute();
    } else if (this.mode === "update") {
      this.updateroute();
    }
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
