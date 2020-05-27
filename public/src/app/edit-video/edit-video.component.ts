/* 
  ||--------------------------------||
  ||   Main Component for Website   ||
  ||--------------------------------||
*/

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';

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
      this.getSingleVideoTitle(params['title'])
    })
  }

  /* Set Title for document header for browser */

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  /*
  If the video data is processed by the form, then this function will run.
  If there's no error from the server, then the video will update in the DB
  and page will navigate to homepage
  */

  updateSingleVideo()
  {
    let observable = this._httpService.updateVideo(this.updateVideo);
    observable.subscribe(data =>
      {
        if(data['success'] == false)
        {
          console.log("Fail");
        }
        else
        {
          console.log(data['success']);
          this.router.navigateByUrl('home');
        }
      })
  }

  /*
  Grab the url data to get the title of the video from the parameter,
  then get the video's data from the database.  This will render the page
  */

  getSingleVideoTitle(title: string)
  {
    let observable = this._httpService.getVideoDetails(title);
    observable.subscribe(data => 
      {
        this.singleVideo = data['video'][0];
        this.updateVideo = data['video'][0];
        this.setTitle("Myriathon | Edit Video: " + this.singleVideo.title);
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
          console.log("Fail")
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
        /* If fail, kick the user out of this page, and return to home page */
        this.router.navigateByUrl('home');
      }
      else
      {
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
