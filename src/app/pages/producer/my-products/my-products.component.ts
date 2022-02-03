import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { ProductsCreateUpdateComponent } from './products-create-update/products-create-update.component';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/service/producer/products.service';
import { filter } from 'rxjs/operators';

import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';

import icAdd from '@iconify/icons-ic/twotone-add';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icMap from '@iconify/icons-ic/twotone-map';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icSearch from '@iconify/icons-ic/twotone-search';

@UntilDestroy()
@Component({
  selector: 'vex-my-products',
  templateUrl: './my-products.component.html',
  animations: [
    fadeInUp400ms,
    stagger40ms,
    fadeInRight400ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class MyProductsComponent implements OnInit, AfterViewInit {

  visible = false;

  layoutCtrl = new FormControl('boxed');

  /**
   * El sujeto que se subscribe a a el Observable que trae de lista de productos en ProductService
   */
  subject$: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);

  /**
   * Variable de tipo Observable que almacena la lista de productos que vienen de ProductService
   */
  data$: Observable<Product[]> = this.subject$.asObservable();

  /**
   * La lista de productos del productor en sesiòn que se encuantra en Firestore
   */
  products: Product[];

  /**
   * Bandera que sirve para determinar si se muestra la tabla de productos en caso de que hayan
   */
  isProducts: boolean;

  /**
   * Variable de tipo string que contiene el id de productor en sesión que viene desde 
   * los parámetros de la URL
   */
  idUser: string;

  /**
   * Todas la columnas que van a estar en la tabla de mis productos
   */
  @Input()
  columns: TableColumn<Product>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Imagen', property: 'image', type: 'image', visible: true },
    { label: 'Nombre', property: 'name', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Tipo Producto', property: 'productType', type: 'text', visible: true },
    { label: 'Precio', property: 'price', type: 'text', visible: true },
    { label: 'Stock', property: 'stock', type: 'text', visible: true },
    { label: 'Unidad de Medida', property: 'unit', type: 'text', visible: true },
    { label: 'Estado Productivo', property: 'productiveStatus', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Finca', property: 'farm', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Disponibilidad', property: 'availabilityDate', type: 'text', visible: false },
    { label: 'Descripción', property: 'description', type: 'text', visible: false },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  /**
   * Variable en donde se establece el número de páginas mostradas en la tabla
   */
  pageSize = 10;

  /**
   * Variable que establece los intérvalor de datos a mostrar en una sola vista de la tabla
   */
  pageSizeOptions: number[] = [5, 10, 20, 50];

  /**
   * Variable a la que se le incializar como una Tabla de Angular Material 
   * en este caso, una tabla  de lista de Productos
   */
  dataSource: MatTableDataSource<Product> | null;

  /**
   * Variable que almacena el objeto de tipo producto seleccionado en la interfaz para ser editado o eliminado
   */
  selection = new SelectionModel<Product>(true, []);

  /**
   * Variable de 
   */
  searchCtrl = new FormControl();

  // Inicialización de los nombres de los íconos a mostrar
  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * Contructor de MyProductsComponent en donde se inyectan las dependencias a usar
   * @param dialog 
   * @param snackbar 
   * @param route 
   * @param productService 
   */
  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  /**
   * Método de tipo get en donde se establecen las columnas que serán visibles en la interfaz  
   */
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Método que obtiene y retonar la variable producerProducts de ProductService
   */
  getData() {
    return this.productService.producerProducts;
  }

  /**
   * Método que se ejecuta uma vez se crea el componente
   */
  ngOnInit() {

    // Se obtiene el id del productor que viene desde la URL del navegador
    this.route.params.subscribe(data => {
      this.idUser = data.id;
    });

    // Se obtiene la lista de productos del productor que está en sesión
    this.productService.getProducerProducts(this.idUser);

    // Se hace un recorrido de todos los productos en Firestore
    this.getData().subscribe(product => {
      if (product.length === 0) {
        this.isProducts = false;
      }
      else {
        this.isProducts = true;
      }
      this.subject$.next(product);
    });

    // Se incializa la tabla de Angular Material
    this.dataSource = new MatTableDataSource();

    // Filtro de datos en la tabla
    this.data$.pipe(
      filter<Product[]>(Boolean)
    ).subscribe(products => {
      this.products = products;
      this.dataSource.data = products;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createProduct() {
    this.route.params.subscribe(({ id }) => {
      this.dialog.open(ProductsCreateUpdateComponent, {
        data: { id }
      });
    })
  }

  updateProduct(product: Product) {
    this.dialog.open(ProductsCreateUpdateComponent, {
      data: product
    });
  }

  deleteProduct(product: Product) {

    this.productService.deleteProduct(product.id).then(() => {
      this.products.splice(this.products.findIndex((existingProduct) => existingProduct.id === product.id), 1);
      this.snackbar.open(`Producto eliminado satisfactoriamente`, 'OK', {
        duration: 2000
      });
      this.selection.deselect(product);
    }).catch(err => {
      this.snackbar.open(`Error: ${err.message}`, 'OK', {
        duration: 2000
      });
    })

  }

  deleteProducts(products: Product[]) {
    products.forEach(c => this.deleteProduct(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Product) {
    const index = this.products.findIndex(c => c === row);
    this.products[index] = change.value;
    this.subject$.next(this.products);
  }

}
