import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/service/auth/auth.service';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { MyRoutesCreateUpdateComponent } from './my-routes-create-update/my-routes-create-update.component';
import { Route } from 'src/app/models/routes.model';
import { RoutesService } from 'src/app/service/carrier/routes.service';
import { ViewDetailDialogComponent } from 'src/app/components/view-detail-dialog/view-detail-dialog.component';

import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

import icAdd from '@iconify/icons-ic/twotone-add';
import icDay from '@iconify/icons-fa-solid/calendar-week';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icMap from '@iconify/icons-fa-solid/map-marked-alt';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms,
    fadeInRight400ms
  ],
})
export class MyRoutesComponent implements OnInit, AfterViewInit {

  /**
   * Se instancian los íconos que utilizan en la vista
   */
  icAdd = icAdd;
  icDay = icDay;
  icDelete = icDelete;
  icEdit = icEdit;
  icMap = icMap;

  /**
   * Indica qué variables deben ser mostradas en la tabla
   */
  displayedColumns: string[] = [
    "route.origin",
    "route.destination",
    "route.startHour",
    "route.serviceDays",
    "route.route",
    "update",
    "delete"
  ];

  /**
   * 
   */
  routes: Route[];

  /**
   * Es el origen de datos de la tabla
   */
  dataSource: MatTableDataSource<Route> | null;

  /**
   * Permite paginar la tabla
   */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
   * Permite ordenar los datos de la tabla
   */
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * 
   * @param routeservice 
   * @param authService 
   * @param dialog 
   * @param snackbar 
   */
  constructor(
    private routeService: RoutesService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.dataSource = new MatTableDataSource();

    this.dataSource.sortingDataAccessor = (element, property) => {
      switch (property) {
        case 'route.origin': return element.origin;
        case 'route.destination': return element.destination;
        case 'route.startHour': return element.startHour;

        default: return element[property];
      }
    };

    const { uid } = await this.authService.getCurrentUser();
    this.routeService.getCarrierDoc(uid);
    this.getRoutesData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRoutesData() {
    this.routeService.routes.subscribe(routes => {
      this.routes = routes;
      this.dataSource.data = this.routes;
    });
  }

  createRoute() {
    this.dialog.open(MyRoutesCreateUpdateComponent).afterClosed().subscribe((route) => {
      if (route) {
        this.routeService.saveRoute(null, route).then(() => {
          this.snackbar.open("La ruta fue agregada satisfactoriamente", "OK", {
            duration: 3000,
          });
        });
      }
    });
  }

  updateRoute(route: Route) {
    this.dialog.open(MyRoutesCreateUpdateComponent, {
      data: route
    }).afterClosed().subscribe((route) => {
      if (route) {
        this.routeService.saveRoute(route.id, route).then(() => {
          this.snackbar.open("La ruta fue editada satisfactoriamente", "OK", {
            duration: 3000,
          });
        });
      }
    });
  }

  openDetailDialog(title: string, elements: string[]) {
    this.dialog.open(ViewDetailDialogComponent, {
      data: {
        title,
        elements
      }
    });
  }

  confirmDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: '¿Estás seguro de que deseas eliminar la ruta seleccionada?',
        buttonText: {
          ok: "Sí, eliminar",
          cancel: "Cancelar"
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteRoute(id);
      }
    })
  }

  deleteRoute(idRoute: string) {
    this.routeService.deleteRoute(idRoute).then(() => {
      this.snackbar.open('Ruta eliminada satisfactoriamente', 'OK', {
        duration: 3000
      })
    });
  }

}
