import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { enviroment } from '../../../enviroment/enviroment';


const API_URL = enviroment.ApiUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(userName: string, password: string) {
    return this.http.post(API_URL + "user/login", { userName, password }, { observe: 'response' })
      .pipe(tap(response => {
        const authToken = response.headers.get('x-access-token');
        this.userService.setToken(authToken!)
      }));
  }
}
