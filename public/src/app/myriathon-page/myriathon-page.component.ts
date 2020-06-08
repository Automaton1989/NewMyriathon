/* 
  ||--------------------------------||
  ||   Myriathon Event Component    ||
  ||--------------------------------||
*/

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-myriathon-page',
  templateUrl: './myriathon-page.component.html',
  styleUrls: ['./myriathon-page.component.css']
})
export class MyriathonPageComponent implements OnInit {

  session: any;
  admin: any;

  constructor(private _httpService: HttpService, private router : Router, private titleService: Title) 
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
    this.setTitle("Myriathon | Myriathon Home Marathon");
    this.checkSession();
    this.receiveMessage(this.session);
    this.checkAdmin();
  }

    /* Set Title for document header for browser */

    public setTitle( newTitle: string) {
      this.titleService.setTitle( newTitle );
    }

  checkSession()
  {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => 
      {
        if(data['success'] == false)
        {
          console.log(" ");
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

  receiveMessage(session) {
    this.session = session;
  }
}
