import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

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

  constructor(private _httpService: HttpService, private router: Router) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

  ngOnInit() 
  {
    this.newUser = {newUsername: "", newEmail: "", newPassword: "", conPassword: "", newSecretMessage: ""}
    this.loginUser = {email: "", password: ""}
    this.displayFalseMessage = false;
    this.checkSession();
    this.receiveMessage(this.session);
  }

  onLogin()
  {
    console.log("We are in the login function!");
    console.log(this.loginUser);
    let observable = this._httpService.loginUser(this.loginUser);
    observable.subscribe(data => 
      {
        console.log("We are returning with login data!", data);
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

  onRegister()
  {
    console.log("We are in the register function!");
    let observable = this._httpService.addUser(this.newUser);
    observable.subscribe(data => 
      {
        console.log("We are returning with register data", data);
        if(data['success'] == false)
        {
          this.displayFalseMessage = true;
          this.serverError = data['msg'];
          this.newUser = {newUsername: "", newEmail: "", newPassword: "", conPassword: "", newSecretMessage: ""};
        }
        else
        {
          console.log("Success!", data);
          this.session = data['user'];
          this.newUser = {newUsername: "", newEmail: "", newPassword: "", conPassword: "", newSecretMessage: ""};
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
