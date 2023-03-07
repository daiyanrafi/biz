import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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
  
}