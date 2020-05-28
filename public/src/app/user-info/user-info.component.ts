/* 
  ||---------------------------------||
  || User Page Component for Website ||
  ||---------------------------------||
*/

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  session: any;
  admin: any;
  user: any;
  updateFalseUser = {admin : false};
  updateTrueUser = {admin : true};

  constructor(private _httpService: HttpService, private router: Router, private route: ActivatedRoute, private titleService: Title) 
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
    this.receiveMessage(this.session);
    this.route.params.subscribe((params: Params) => 
    {
      this.getUserInfo(params['username'])
    })
  }

  /* Set Title for document header for browser */

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  /*
  Grab the parameter string and get a user's information from DB and server
  */

  getUserInfo(username)
  {
    let observable = this._httpService.getUserData(username)
    observable.subscribe(data => 
      {
        if(data['success'] == true)
        {
          this.user = data['user'];
          this.setTitle("Myriathon | User: " + this.user.username);
        }
        else
        {
          this.router.navigateByUrl('home');
        }
      })
  }

  /*
  Remove the admin privilages of the user
  */

  removeAdmin()
  {
    let observable = this._httpService.removeAdminPrivilages(this.user.username, this.updateFalseUser);
    observable.subscribe(data =>
      {
        this.router.navigateByUrl('home');
      })
  }

  /*
  Grant admin privilages to the user
  */

  addAdmin()
  {
    let observable = this._httpService.addAdminPrivilages(this.user.username, this.updateTrueUser);
    observable.subscribe(data => 
      {
        this.router.navigateByUrl('home');
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
