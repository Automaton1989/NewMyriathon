import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  session: any;
  admin: any;

  constructor(private _httpService: HttpService, private router : Router) 
  {
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

  ngOnInit() 
  {
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
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
