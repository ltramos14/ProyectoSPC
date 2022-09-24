import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Observable, ReplaySubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/service/users/users.service';
import { UpdateUserComponent } from './update-user/update-user.component';

import icAdd from '@iconify/icons-ic/twotone-add';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icSearch from '@iconify/icons-ic/twotone-search';
import icVerified from '@iconify/icons-ic/twotone-verified-user';
import icWait from '@iconify/icons-ic/twotone-access-time';

@UntilDestroy()
@Component({
  selector: 'spc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
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
export class UsersComponent implements OnInit {

  @Input()
  columns: TableColumn<User>[] = [
    { label: 'Foto perfil', property: 'profileURL', type: 'image', visible: true },
    { label: 'Nombres', property: 'names', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Apellidos', property: 'lastnames', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Correo electrónico', property: 'email', type: 'text', visible: true },
    { label: 'Municipio', property: 'municipality', type: 'text', visible: true },
    { label: 'Teléfono', property: 'phone', type: 'text', cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Fecha de nacimiento', property: 'dateBirth', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Tipo de usuario', property: 'typeuser', type: 'button', visible: true },
    { label: 'Activo', property: 'isActive', type: 'button', visible: true },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  imageDefault: string = './assets/illustrations/no-product.png';

  visible = false;

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>();

  data$: Observable<User[]> = this.subject$.asObservable();

  users: User[];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<User> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  selection = new SelectionModel<User>(true, []);

  searchCtrl = new FormControl();

  loading: boolean = false;

  icAdd = icAdd;
  icCheck = icCheck;
  icDelete = icDelete;
  icEdit = icEdit;
  icFilterList = icFilterList;
  icFolder = icFolder;
  icMail = icMail;
  icMap = icMap;
  icMoreHoriz = icMoreHoriz;
  icSearch = icSearch;
  icPhone = icPhone;
  icVerified = icVerified;
  icWait = icWait;

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.dataSource = new MatTableDataSource();

    this.getUsers().subscribe(users => {
      this.subject$.next(users);
    })

    this.data$.pipe(
      filter<User[]>(Boolean)
    ).subscribe(users => {
      this.dataSource.data = users;
      this.users = users;
      this.loading = false;
    })

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));

  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getUsers() {
    return this.userService.getUserToAdministrator();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateUserInfo(user: User) {
    this.dialog.open(UpdateUserComponent, {
      data: user
    }).afterClosed().pipe(take(1)).subscribe((user: User) => {
      if (user) {
        this.userService.onSaveUserInformation(user, user.uid)
          .then((res) => {
            this.snackbar.open(`Información del usuario ${ user.names + ' ' + user.lastnames } actualizada satisfactoriamente`, 'OK', { duration: 3000 });
            this.subject$.next(this.users);
          });
        }
        
    });
  }

  updateIsActive(ev: MatSlideToggleChange, user: User) {
    user.isActive = ev.checked;
    this.userService.onSaveUserInformation(user, user.uid)
      .then((res) => 
        this.snackbar.open(`El ${ user.typeuser.toLowerCase() } ${ user.names + ' ' + user.lastnames } ha sido ${ user.isActive ? 'habilitado' : 'inhabilitado' }`, 'OK', { duration: 3000 })
      );
  }

  onVerifiedPerson(user: User) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        message: `¿Estás seguro que deseas verificar y conceder los permisos al usuario ${user.names + " " + user.lastnames}?`,
        confirmButton: { text: "Sí, verificar", color: "accent" },
        cancelButton: { text: "Cancelar", color: "warn" },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.verifiedUserSpc(user);
      }
    });
  }

  verifiedUserSpc(user: User) {
    user.isVerifiedPerson = true;
    this.userService.onSaveUserInformation(user, user.uid)
      .then((res) => 
        this.snackbar.open(`El ${ user.typeuser.toLowerCase() } ${ user.names + ' ' + user.lastnames } ha sido verificado exitosamente.`, 'OK', { duration: 0 })
      );
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

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: User) {
    const index = this.users.findIndex(c => c === row);
    this.users[index] = change.value;
    this.subject$.next(this.users);
  }

}
