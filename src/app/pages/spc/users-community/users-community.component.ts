import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/service/users/users.service';

import icLocation from '@iconify/icons-ic/twotone-location-on';

@Component({
  selector: 'spc-users-community',
  templateUrl: './users-community.component.html',
  styleUrls: ['./users-community.component.scss']
})
export class UsersCommunityComponent implements OnInit, OnDestroy {

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);

  data$: Observable<User[]> = this.subject$.asObservable();

  subscription: Subscription[] = [];

  users: User[];

  userType: string;

  loading: boolean = false;

  icLocation = icLocation;

  constructor(
    private userService: UsersService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.push(this.activeRoute.params.subscribe((data) => {
      this.userType = data.tipo;
      this.loading = true;
      this.subscription.push(this.userService
        .getUsersByType(data.tipo)
        .subscribe((users) => {
          this.users = users;
          this.loading = false;
          console.log(this.users)
        }));
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

}
