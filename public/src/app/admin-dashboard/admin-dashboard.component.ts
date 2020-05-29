/* 
  ||--------------------------------||
  ||Admin Dash Component for Website||
  ||--------------------------------||
*/

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  session: any;
  admin: any;
  seasons: [];
  users : [];

  constructor(private _httpService: HttpService, private router: Router, private titleService: Title) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

/* 
  ||--------------------------------||
  ||       On Init Functions        ||
  ||--------------------------------||
*/

  ngOnInit() 
  {
    this.checkSession();
    this.checkAdmin();
    this.setTitle("Myriathon | Admin Dashboard");
    this.getAllUsers();
    this.getAllSeasons();
    this.receiveMessage(this.session);
  }

  /* Set Title for document header for browser */

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  /* 
  Get All the seasons data from database and server to display
  On the page (table)
  */

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
        }
      })
  }

  /*
  Get all the users data from database and server to display
  their information on a table
  */

  getAllUsers()
  {
    let observable = this._httpService.getUsersData();
    observable.subscribe(data => 
      {
        this.users = data['users'];
      })
  }

  /* This will check the user's session information.  If session is null from server, nothing will happen.  If session is available, then it'll store */

  checkSession() 
  {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => {
      this.session = data['user']
      this._httpService.send(this.session)
    })
  }

  /* This will check the session's data from the server, and if the data returned has the user admin equal to true, Angular will store admin as the user. */

  checkAdmin() 
  {
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

  /* This is for passing session data accross the angular components */

  receiveMessage(session) 
  {
    this.session = session;
  }

}
