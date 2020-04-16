import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.css']
})
export class AllVideosComponent implements OnInit {

  session: any;
  seasons = [];
  activeSeasonNumber: any;
  dropdownOpen = false;

  clearSeason = {
    _id: null,
    name: "Clear season",
    number: 0,
    videos: [],
  }

  constructor(private _httpService: HttpService, private router : Router) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this))
  }

  ngOnInit() {
    this.checkSession();
    this.receiveMessage(this.session);
    this.getAllSeasons();
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

}
