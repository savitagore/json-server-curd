import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  description: string;
}
function createNewUser(id: number): User {
  const description = `Description for user ${id}`;
  return {
    id: id,
    name: `User ${id}`,
    description: description,
  };
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource: MatTableDataSource<User>;
  filteredUsers: User[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userSrv: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource<User>();
    this.getAllUser();
    this.loadUsers();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  loadUsers(): void {
    this.userSrv.getItems().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllUser() {
    this.userSrv.getItems().subscribe((res: any) => {
      this.dataSource = res;
    });
  }
  addUser() {
    this.router.navigate(['/addUser']);
  }
  deleteUser(id: number) {
    this.userSrv.deleteItem(id).subscribe(
      () => {
        this.getAllUser(); // Reload the data after deletion
        alert('User successfully deleted');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  editUser(user: User) {
    this.router.navigate(['addUser', user.id]);
  }
}
