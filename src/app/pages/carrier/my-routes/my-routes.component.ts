import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from 'src/app/models/routes.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RoutesService } from 'src/app/service/carrier/routes.service';
import { MyRoutesCreateUpdateComponent } from './my-routes-create-update/my-routes-create-update.component';
import icAdd from '@iconify/icons-ic/twotone-add';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icEdit from '@iconify/icons-ic/twotone-edit';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';

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
export class MyRoutesComponent implements OnInit {

  routes: Route[];
  
  icAdd = icAdd;
  icDelete = icDelete;
  icEdit = icEdit;
  
  /* icClose = icClose;
  icPlace = icPlace;
  icLocation = icLocation;
  icDescription = icDescription;
  icEdit = icEdit;
  icDelete = icDelete; */

  imageDefault: string = '../../../../../assets/images/LogoSPCv1.png';

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
   * Es el origen de datos de la tabla
   */
  dataSource = new MatTableDataSource<Route>();

  /**
   * Permite ordenar los datos de la tabla
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Permite paginar la tabla
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private routeservice: RoutesService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  async ngOnInit() {
    const { uid } = await this.authService.getCurrentUser();
    this.routeservice.getCarrierDoc(uid);
    this.getRoutesData();
  }
  
  getRoutesData() {
    this.routeservice.routes.subscribe(routes => {
      this.routes = routes;
      this.dataSource = new MatTableDataSource(routes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  createRoute() {
    this.dialog.open(MyRoutesCreateUpdateComponent);
  }

  updateRoute(route: Route) {
    this.dialog.open(MyRoutesCreateUpdateComponent, {
      data: route
    });
  }

  confirmDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: '¡Estás seguro de que deseas eliminar la ruta?',
        buttonText: {
          ok: "Eliminar ruta",
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

  deleteRoute(idFarm: string) {
    this.routeservice.deleteRoute(idFarm).then(() => {
      this.snackbar.open('Ruta desvinculada satisfactoriamente', 'OK', {
        duration: 3000
      })
    })
  }

}
