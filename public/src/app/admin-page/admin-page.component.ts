/* 
  ||--------------------------------||
  ||   Main Component for Website   ||
  ||--------------------------------||
*/

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  newUser: any;
  loginUser: any;
  session: any;
  falseMessage = "-- ERROR: You've encountered an issue --";
  serverError = "";
  displayFalseMessage = false;

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
    this.newUser = {newUsername: "", newEmail: "", newPassword: "", conPassword: "", newSecretMessage: ""}
    this.loginUser = {email: "", password: ""}
    this.displayFalseMessage = false;
    this.setTitle("Myriathon | Admin");
    this.checkSession();
    this.receiveMessage(this.session);
    
  }

  /* Set Title for document header for browser */

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  /*
  Function for taking in form data, and if successful, log in the user to website.
  Also has error checking in case something goes wrong
  */

  onLogin()
  {
    let observable = this._httpService.loginUser(this.loginUser);
    observable.subscribe(data => 
      {
        if(data["success"] == false)
        {
          this.displayFalseMessage = true;
          this.serverError = data['msg'];
          this.loginUser = {email: "", password: ""};
        }
        else
        {
          this.session = data['user'];
          this.loginUser = {email: "", password: ""};
          this.router.navigateByUrl("home");
        }
      })
  }

  /*
  Function for taking in form data, and if successful, register the user to the database
  Also has error checking in case something goes wrong
  */

  onRegister()
  {
    let observable = this._httpService.addUser(this.newUser);
    observable.subscribe(data => 
      {
        if(data['success'] == false)
        {
          this.displayFalseMessage = true;
          this.serverError = data['msg'];
          this.newUser = {newUsername: "", newEmail: "", newPassword: "", conPassword: "", newSecretMessage: ""};
        }
        else
        {
          this.session = data['user'];
          this.newUser = {newUsername: "", newEmail: "", newPassword: "", conPassword: "", newSecretMessage: ""};
          this.router.navigateByUrl('home');
        }
      })
  }

  /* This will check the user's session information.  If session is null from server, nothing will happen.  If session is available, then it'll store */

  checkSession() {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => {
      this.session = data['user']
      this._httpService.send(this.session)
    })
  }

  /* This is for passing session data accross the angular components */

  receiveMessage(session)
  {
    this.session = session;
  }

}
