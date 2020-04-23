import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.css']
})
export class AllVideosComponent implements OnInit {

  session: any;
  admin: any;
  seasons = [];
  activeSeasonNumber: any;
  dropdownOpen = false;
  recentVideo: any;
  image;

  clearSeason = {
    _id: null,
    name: "Clear season",
    number: 0,
    videos: [],
  }
  sanitization: any;

  constructor(private _httpService: HttpService, private router : Router, public sanitizer : DomSanitizer) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this))
  }

  ngOnInit() {
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
    this.getAllSeasons();
    this.getRecentVideo();
  }


  toggleDropdown()
  {
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen);
  }

  getAllSeasons()
  {
    console.log("We are getting all the season's data!");
    let observable = this._httpService.getSeasons();
    observable.subscribe(data => 
      {
        if(data['success'] == false)
        {
          console.log("We didn't get the data we wanted!")
        }
        else
        {
          this.seasons = data['seasons'];
          this.seasons.push(this.clearSeason)
          console.log(this.seasons)
        }
      })
  }

  getRecentVideo()
  {
    console.log("We are getting the most recent video's data!");
    let observable = this._httpService.getLastVideo();
    observable.subscribe(data => 
      {
        console.log("Got the recent video's data!", data);
        this.recentVideo = data['video'];
      })
  }

  activeSeason(seasonNumber)
  {
    if(seasonNumber == 0)
    {
      this.activeSeasonNumber = null;
    }
    this.activeSeasonNumber = seasonNumber;
    console.log(seasonNumber);
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
      }
      else
      {
        console.log("Admin is true");
        this.admin = data['user'];
      }
    })
  }

}
