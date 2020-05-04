import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

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

  constructor(private _httpService: HttpService, private router: Router) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

  ngOnInit() 
  {
    this.checkSession();
    this.checkAdmin();
    this.getAllUsers();
    this.getAllSeasons();
    this.receiveMessage(this.session);
  }

  getAllSeasons()
  {
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
        }
      })
  }

  getAllUsers()
  {
    let observable = this._httpService.getUsersData();
    observable.subscribe(data => 
      {
        console.log("Got the user data!", data);
        this.users = data['users'];
      })
  }

  receiveMessage(session) {
    this.session = session;
  }
  checkSession() {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => {
      this.session = data['user']
      this._httpService.send(this.session)
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
