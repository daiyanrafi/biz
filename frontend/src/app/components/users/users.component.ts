import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs';
import { UserData } from '../../services/user-service/user.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  dataSource: UserData| null = null;
  pageEvent: PageEvent | null = null;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];
  
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.initDataSource(); 
  }

  initDataSource(){
    this.userService.findAll(1, 10).pipe(
      tap(users => console.log(users)),
      map((userData: any) => this.dataSource = userData)
    ).subscribe();
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    this.userService.findAll(page, size).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }
  
}