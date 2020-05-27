/* 
  ||--------------------------------||
  ||All Videos Component for Website||
  ||--------------------------------||
*/

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';

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

  constructor(private _httpService: HttpService, private router : Router, public sanitizer : DomSanitizer, private titleService: Title) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this))
  }

/* 
  ||--------------------------------||
  ||       On Init Functions        ||
  ||--------------------------------||
*/

  ngOnInit() {
    this.setTitle("Myriathon | All Videos");
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
    this.getRecentVideo();
    this.getAllSeasons();
  }

  /* Set Title for document header for browser */

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  /* Toggle the dropdown menu for seeing all the seasons */

  toggleDropdown()
  {
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen);
  }

  /* Grab all the seasons data from the server */

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

  /* Get the most recently updated video from our database */

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

/* 
  When a user clicks on a season in the dropdown, grab the season 
  which the user grabbed and display all videos attributed to this season 
*/

  activeSeason(seasonNumber)
  {
    if(seasonNumber == 0)
    {
      this.activeSeasonNumber = null;
    }
    this.activeSeasonNumber = seasonNumber;
    console.log(seasonNumber);
  }

  /* This will check the user's session information.  If session is null from server, nothing will happen.  If session is available, then it'll store */

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

  /* This will check the session's data from the server, and if the data returned has the user admin equal to true, Angular will store admin as the user. */

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

  /* This is for passing session data accross the angular components */

  receiveMessage(session)
  {
    this.session = session;
  }

}
