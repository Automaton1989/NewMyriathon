/* 
  ||------------------------------------||
  || Single Video Component for Website ||
  ||------------------------------------||
*/

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.css']
})
export class SingleVideoComponent implements OnInit {

  [x: string]: any;

  session: any;
  admin: any;
  singleVideo: any;
  nextVideo: any;
  previousVideo: any;
  url;
  title = "";

  constructor(private _httpService: HttpService, private router : Router, private route: ActivatedRoute, public sanitizer : DomSanitizer, private titleService: Title) 
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
  Grab the previous video from the selected video and season, 
  and add a button to the HTML if it's true.  
  If null, no button should show up 
  */

  getPreviousVideo(singleVideoTitle, singleSeasonNumber)
  {
    let observable = this._httpService.getPreviousVideoDetails(singleVideoTitle, singleSeasonNumber);
    observable.subscribe(data => 
      {
        console.log("We got the previous video data!", data);
        this.previousVideo = data['video'];
      })
  }

  /*
  Get the next video from the selected video and season
  and add a button to the HTML if it's true.
  If null, no button should show up
  */

  getNextVideo(singleVideoTitle, singleSeasonNumber)
  {
    let observable = this._httpService.getNextVideoDetails(singleVideoTitle, singleSeasonNumber);
    observable.subscribe(data => 
      {
        console.log("We got the next video data!", data);
        this.nextVideo = data['video'];
      })
  } 

  /*
  Get the current selected video's title, and grab all the video's
  information from the database and server.  This will allow the page
  to load properly
  */

  getSingleVideoTitle(title: string)
  {
    let observable = this._httpService.getVideoDetails(title);
    observable.subscribe(data => 
      {
        this.singleVideo = data['video'][0];
        this.getSafeUrl(this.singleVideo.videoURL);
        this.getNextVideo(this.singleVideo.title, this.singleVideo.seasonNumber);
        this.getPreviousVideo(this.singleVideo.title, this.singleVideo.seasonNumber);
        this.setTitle("Myriathon | " + this.singleVideo.title);
      })
  }

  /* Sanitize the youtube URL for embedding */

  getSafeUrl(url)
  {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
