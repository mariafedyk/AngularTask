import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService { httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  constructor( private http: HttpClient) {
  }

  // GET: get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiLink);
  }

  // Search user with given username and password
  hasUser(username: string, password: string): Observable<boolean> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    const url = `${environment.apiLink}/sign-in`;
    return this.http.get<boolean>(url, {params});
  }

  // POST: add new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiLink, user);
  }

  // PUT: edit given user
  editUser(user: User): Observable<User> {
    const url = `${environment.apiLink}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions);
  }

  // DELETE: delete user by id
  deleteUser(userId: number): Observable<User> {
    const url = `${environment.apiLink}/${userId}`;
    return this.http.delete<User>(url, this.httpOptions);
  }
}