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

  ngOnInit() {
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
    this.route.params.subscribe((params: Params) => 
    {
      this.getSingleVideoTitle(params['title'])
    })
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getPreviousVideo(singleVideoTitle, singleSeasonNumber)
  {
    let observable = this._httpService.getPreviousVideoDetails(singleVideoTitle, singleSeasonNumber);
    observable.subscribe(data => 
      {
        console.log("We got the previous video data!", data);
        this.previousVideo = data['video'];
      })
  }

  getNextVideo(singleVideoTitle, singleSeasonNumber)
  {
    let observable = this._httpService.getNextVideoDetails(singleVideoTitle, singleSeasonNumber);
    observable.subscribe(data => 
      {
        console.log("We got the next video data!", data);
        this.nextVideo = data['video'];
      })
  }

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

  getSafeUrl(url)
  {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
