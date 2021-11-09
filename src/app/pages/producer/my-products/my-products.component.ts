import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ProductsCreateUpdateComponent } from './products-create-update/products-create-update.component';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import { ProductsService } from 'src/app/service/producer/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

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
  styleUrls: ['./my-products.component.scss'],
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
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);
  data$: Observable<Product[]> = this.subject$.asObservable();
  products: Product[];
  isProducts: boolean;
  idUser: string;

  @Input()
  columns: TableColumn<Product>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Imagen', property: 'image', type: 'image', visible: true },
    { label: 'Nombre', property: 'name', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Tipo Producto', property: 'productType', type: 'text', visible: true },
    { label: 'Precio', property: 'price', type: 'text', visible: true },
    { label: 'Unidad de Medida', property: 'unit', type: 'text', visible: false },
    { label: 'Estado Productivo', property: 'productiveStatus', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Finca', property: 'farm', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Disponibilidad', property: 'availabilityDate', type: 'text', visible: false },
    { label: 'Descripción', property: 'description', type: 'text', visible: false },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Product> | null;
  selection = new SelectionModel<Product>(true, []);
  searchCtrl = new FormControl();

  //labels = aioTableLabels;

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

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private productService: ProductsService
    ) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    //return of(aioTableData.map(customer => new Customer(customer)));
    return this.productService.producerProducts;
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.idUser = data.id;
    })
    this.productService.getProducerProducts(this.idUser);
    this.getData().subscribe(product => {
      if (product.length === 0) {
        this.isProducts = false;
      }
      else {
        this.isProducts = true;
      }
      this.subject$.next(product);
    });

    this.dataSource = new MatTableDataSource();

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
    let idUser;
    this.route.params.subscribe(data => {
      idUser = data.id;
    })
    this.dialog.open(ProductsCreateUpdateComponent, {
      data: { idUser }
    });
  }

  updateProduct(product: Product) {
    this.dialog.open(ProductsCreateUpdateComponent, {
      data: product
    });
  }

  deteleProduct(product: Product) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.productService.deleteProduct(product.id).then(() => {
      this.products.splice(this.products.findIndex((existingProduct) => existingProduct.id === product.id), 1);
      this.snackbar.open(`Producto eliminado satisfactoriamente`, 'OK', {
        duration: 2000
      });
      this.selection.deselect(product);
    }).catch(err => {
      this.snackbar.open(`Error: ${ err.message }`, 'OK', {
        duration: 2000
      });
    })
  }

  deteleProducts(products: Product[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    products.forEach(c => this.deteleProduct(c));
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
