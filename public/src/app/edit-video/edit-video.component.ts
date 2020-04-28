import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {

  [x: string]: any;

  session: any;
  admin: any;
  singleVideo;
  updateVideo;

  constructor(private _httpService: HttpService, private router : Router, private route: ActivatedRoute) 
  { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

  ngOnInit() {
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
    this.route.params.subscribe((params: Params) => 
    {
      this.getSingleVideoTitle(params['title'])
    })
  }

  updateSingleVideo()
  {
    console.log("You pressed the button!");
    let observable = this._httpService.updateVideo(this.updateVideo);
    observable.subscribe(data =>
      {
        console.log("We are getting new data", data);
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

  getSingleVideoTitle(title: string)
  {
    let observable = this._httpService.getVideoDetails(title);
    observable.subscribe(data => 
      {
        console.log("We got the data!", data);
        this.singleVideo = data['video'][0];
        this.updateVideo = data['video'][0];
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
