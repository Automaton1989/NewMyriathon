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
  getSeasons()
  {
    return this._http.get('/myriathon/all/seasons');
  }
  getLastVideo()
  {
    return this._http.get('/myriathon/last/video');
  }
  getVideoDetails(title)
  {
    return this._http.get('/myriathon/single/' + title);
  }
  getSeasonDetails(name)
  {
    return this._http.get('/myriathon/season/' + name);
  }
  getPreviousVideoDetails(singleVideoTitle, singleSeasonNumber)
  {
    return this._http.get('/myriathon/prev/video/' + singleVideoTitle + '/' + singleSeasonNumber);
  }
  getNextVideoDetails(singleVideoTitle, singleSeasonNumber)
  {
    return this._http.get('/myriathon/next/video/' + singleVideoTitle + '/' + singleSeasonNumber);
  }
  updateVideo(updateVideo)
  {
    return this._http.put('/myriathon/update/video/' + updateVideo._id, {updateVideo : updateVideo});
  }
  updateSeasonDetails(updateSeason)
  {
    return this._http.put('/myriathon/update/season/' + updateSeason._id, {updateSeason : updateSeason});
  }
  getUsersData()
  {
    return this._http.get('/myriathon/all/users');
  }
  getUserData(username)
  {
    return this._http.get('/myriathon/user/data/' + username);
  }
  removeAdminPrivilages(username, updateUser)
  {
    return this._http.put('/myriathon/remove/admin/' + username, {updateUser : updateUser});
  }
  addAdminPrivilages(username, updateUser)
  {
    return this._http.put('/myriathon/add/admin/' + username, {updateUser : updateUser});
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
