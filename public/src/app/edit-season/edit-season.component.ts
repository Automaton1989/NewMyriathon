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

  ngOnInit() {
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
    this.route.params.subscribe((params: Params) => 
    {
      this.getSingleSeasonName(params['name'])
    })
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

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
        //this.router.navigateByUrl('home');
      }
      else
      {
        console.log("Admin is true");
        this.admin = data['user'];
      }
    })
  }

}
