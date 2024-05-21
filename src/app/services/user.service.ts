import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getItems(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getItem(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addItem(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  updateItem(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // updateItem(user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  // }
  // updateItem(item: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/${item.id}`, item);
  // }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
