import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { Login } from '../';

/*@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class LoginService {

  private readonly PATH: string = 'auth'; //URI no qual vai fazer o login na api

  constructor(private http: HttpClient) {}

   logar(login: Login): Observable<any>{
     return this.http.post(env.baseUrl+this.PATH, login);
   }
}
