import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myriathon-page',
  templateUrl: './myriathon-page.component.html',
  styleUrls: ['./myriathon-page.component.css']
})
export class MyriathonPageComponent implements OnInit {

  session: any;

  constructor(private _httpService: HttpService, private router : Router) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

  ngOnInit() 
  {
    this.checkSession();
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

}
