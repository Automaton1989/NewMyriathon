import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-video-page',
  templateUrl: './add-video-page.component.html',
  styleUrls: ['./add-video-page.component.css']
})
export class AddVideoPageComponent implements OnInit {

  session: any;
  falseMessage = "-- ERROR: You've encountered an issue --";
  serverError = "";
  displayFalseMessage = false;
  newSeason: any;
  newVideo: any;
  admin: any

  constructor(private _httpService: HttpService, private router: Router) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

  ngOnInit() 
  {
    this.newSeason = {newSeasonName: "", newSeasonNumber: null};
    this.newVideo = {newVideoTitle: "", newVideoDescription: "", newVideoImg: "", newVideoURL: "", newVideoSeason: null};
    this.displayFalseMessage = false;
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
  }

  createSeason()
  {
    let observable = this._httpService.addSeason(this.newSeason);
    observable.subscribe(data => 
      {
        if(data['success'] == false)
        {
          this.displayFalseMessage = true;
          this.serverError = data['msg'];
          this.newSeason = {newSeasonName: "", newSeasonNumber: null};
        }
        else
        {
          this.newSeason = {newSeasonName: "", newSeasonNumber: null};
          this.router.navigateByUrl('home');
        }
      })
  }

  createVideo()
  {
    let observable = this._httpService.addVideo(this.newVideo);
    observable.subscribe(data =>
      {
        if(data['success'] == false)
        {
          this.displayFalseMessage = true;
          this.serverError = data['msg'];
          this.newVideo = {newVideoTitle: "", newVideoDescription: "", newVideoImg: "", newVideoURL: "", newVideoSeason: null};
        }
        else
        {
          this.newVideo = {newVideoTitle: "", newVideoDescription: "", newVideoImg: "", newVideoURL: "", newVideoSeason: null};
          this.router.navigateByUrl('home');
        }
      })
  }

  receiveMessage(session)
  {
    this.session = session;
  }
  checkSession()
  {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => 
      {
        if(data['success'] == true)
        {
          this.session = data['user'];
          this._httpService.send(this.session);
        }
      })
  }

  checkAdmin() {
    let observable = this._httpService.checkAdmin();
    observable.subscribe(data => {
      if(data['success'] == false)
      {
        this.router.navigateByUrl("home");
      }
      else
      {
        this.admin = data['user'];
      }
    })
  }

}
