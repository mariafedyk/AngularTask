import {Component, OnInit} from '@angular/core';
import {UserService} from '../general_files/services/user.service';
import {AuthService} from '../general_files/services/auth.service';
import {User} from '../general_files/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ShowUserInfoComponent } from '../show-user-info/show-user-info.component'
import { AddUserComponent } from '../add-user/add-user.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  users: User[];
  data: object;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: User[]) => this.users = users);
  }

  editUser(user: User): void {
    const modalRef = this.modalService.open(AddUserComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then((editedUser: User) => {
      this.userService.editUser(editedUser)
        .subscribe(() => {
          const userIndex = this.users.findIndex((u: User) => u.id === editedUser.id);
          this.users.splice(userIndex, 1, editedUser);
        });
    }).catch(() => {});
  }


  addUser(): void {
    const modalRef = this.modalService.open(AddUserComponent);
    modalRef.componentInstance.user = {};
    modalRef.result.then((newUser: User) => {
    this.userService.addUser(newUser);
    this.users.push(newUser);
    }).catch(() => {
    });
};
  remove(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id)
        .subscribe(() => this.users = this.users.filter(user => user.id !== id));
    }
  }

  async logout(): Promise<void> {
    await this.authService.logOut();
  }

  showInfo(user: User): void {
    const modalRef = this.modalService.open(ShowUserInfoComponent);
    modalRef.componentInstance.user = user;
  }
}