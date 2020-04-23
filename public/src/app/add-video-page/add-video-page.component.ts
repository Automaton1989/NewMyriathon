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
    this.checkAdmin();
    this.newSeason = {newSeasonName: "", newSeasonNumber: null};
    this.newVideo = {newVideoTitle: "", newVideoDescription: "", newVideoImg: "", newVideoURL: "", newVideoSeason: null};
    this.displayFalseMessage = false;
    this.checkSession();
    this.receiveMessage(this.session);
  }

  createSeason()
  {
    console.log("We are creating a season now!");
    let observable = this._httpService.addSeason(this.newSeason);
    observable.subscribe(data => 
      {
        console.log("We are returning with new season data", data);
      })
    this.newSeason = {newSeasonName: "", newSeasonNumber: null};
  }

  createVideo()
  {
    console.log("We are creating a video now!");
    let observable = this._httpService.addVideo(this.newVideo);
    observable.subscribe(data =>
      {
        console.log("We are returning with new video data", data);
      })
    this.newVideo = {newVideoTitle: "", newVideoDescription: "", newVideoImg: "", newVideoURL: "", newVideoSeason: null};
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
        if(data['success'] == false)
        {
          console.log("No session found!")
        }
        else
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
        console.log("Admin is false");
        this.router.navigateByUrl("home");
      }
      else
      {
        console.log("Admin is true");
        this.admin = data['user'];
      }
    })
  }

}
