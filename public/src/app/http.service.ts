import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  [x: string]: any;
  private _stream$ = new BehaviorSubject("");
  public stream$ = this._stream$.asObservable();

  constructor(private _http: HttpClient) { 
  
  }
  addUser(newUser) 
  {
    return this._http.post('/myriathon/new/user', {newUser : newUser})
  }
  loginUser(loginUser) 
  {
    return this._http.post('/myriathon/login/user', {loginUser: loginUser})
  }
  addSeason(newSeason)
  {
    return this._http.post('myriathon/new/season', {newSeason : newSeason});
  }
  addVideo(newVideo)
  {
    return this._http.post('myriathon/new/video', {newVideo : newVideo});
  }
  send(session : any) 
  {
    this._stream$.next(session)
  }
  checkSession() 
  {
    return this._http.get('/myriathon/session')
  }
  checkAdmin() 
  {
    return this._http.get('/myriathon/admin')
  }
  logout() 
  {
    return this._http.get('/myriathon/logout')
  }
}
