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
  currentSeason: any;
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
  }

  /* Grab all the seasons data from the server */

  getAllSeasons()
  {
    let observable = this._httpService.getSeasons();
    observable.subscribe(data => 
      {
        if(data['success'] == false)
        {
          console.log(" ")
        }
        else
        {
          this.seasons = data['seasons'];
          this.seasons.push(this.clearSeason)
          //this.sortSeasons(this.seasons);
        }
      })
  }

  /* Get the most recently updated video from our database */

  getRecentVideo()
  {
    let observable = this._httpService.getLastVideo();
    observable.subscribe(data => 
      {
        this.recentVideo = data['video'];
      })
  }

/* 
  When a user clicks on a season in the dropdown, grab the season 
  which the user grabbed and display all videos attributed to this season 
*/

  getCurrentSeason(seasonName)
  {
    if(seasonName == "Clear Season")
    {
      this.currentSeason = null;
    }
    else
    {
      let observable = this._httpService.getSeasonDetails(seasonName);
      observable.subscribe(data =>
        {
          this.currentSeason = data['season'];
        })
    }
  }

  /* This will check the user's session information.  If session is null from server, nothing will happen.  If session is available, then it'll store */

  checkSession()
  {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => 
      {
        if(data['success'] == false)
        {
          console.log(" ")
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
        console.log(" ");
      }
      else
      {
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
