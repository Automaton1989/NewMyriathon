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

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getUserInfo(username)
  {
    let observable = this._httpService.getUserData(username)
    observable.subscribe(data => 
      {
        if(data['success'] == true)
        {
          console.log("Got the user data!", data);
          this.user = data['user'];
          this.setTitle("Myriathon | User: " + this.user.username);
        }
        else
        {
          console.log("ERROR!");
          this.router.navigateByUrl('home');
        }
      })
  }

  removeAdmin()
  {
    let observable = this._httpService.removeAdminPrivilages(this.user.username, this.updateFalseUser);
    observable.subscribe(data =>
      {
        console.log("User data updated: ", data);
      })
  }

  addAdmin()
  {
    let observable = this._httpService.addAdminPrivilages(this.user.username, this.updateTrueUser);
    observable.subscribe(data => 
      {
        console.log("User data updated: ", data);
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
      }
      else
      {
        console.log("Admin is true");
        this.admin = data['user'];
      }
    })
  }


}
