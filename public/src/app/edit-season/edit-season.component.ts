/* 
  ||--------------------------------||
  ||   Main Component for Website   ||
  ||--------------------------------||
*/

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-season',
  templateUrl: './edit-season.component.html',
  styleUrls: ['./edit-season.component.css']
})
export class EditSeasonComponent implements OnInit {

  [x: string]: any;

  session: any;
  admin: any;
  singleSeason;
  updateSeason;

  constructor(private _httpService: HttpService, private router : Router, private route: ActivatedRoute, private titleService: Title) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

/* 
  ||--------------------------------||
  ||       On Init Functions        ||
  ||--------------------------------||
*/

  ngOnInit() {
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
    this.route.params.subscribe((params: Params) => 
    {
      this.getSingleSeasonName(params['name'])
    })
  }

  /* Set Title for document header for browser */

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  /*
  If data from the form is submitted, and it's new data, then the server will
  check if the information is valid.  If true, then it will update the DB,
  and navigate to home page.
  */

  updateSingleSeason()
  {
    console.log("You pressed the button!");
    let observable = this._httpService.updateSeasonDetails(this.updateSeason);
    observable.subscribe(data =>
    {
      console.log("We updated the data!", data);
      if(data['success'] == false)
      {
        console.log(data['success']);
      }
      else
      {
        console.log(data['success']);
        this.router.navigateByUrl('home');
      }
    })
  }

  /*
  Get the season data from the route parameter.  
  */

  getSingleSeasonName(name: string)
  {
    let observable = this._httpService.getSeasonDetails(name);
    observable.subscribe(data =>
      {
        console.log("We got the data!", data);
        this.singleSeason = data['season'];
        this.updateSeason = data['season'];
        this.setTitle("Myriathon | Edit Season: " + this.singleSeason.name);
      })
  }

  /* This will check the user's session information.  If session is null from server, nothing will happen.  If session is available, then it'll store */

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

  /* This will check the session's data from the server, and if the data returned has the user admin equal to true, Angular will store admin as the user. */

  checkAdmin() {
    let observable = this._httpService.checkAdmin();
    observable.subscribe(data => {
      if(data['success'] == false)
      {
        console.log("Admin is false");
        //this.router.navigateByUrl('home');
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
