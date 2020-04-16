import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'public';
  navbarOpen = false;
  hamburgerOpen = false;
  session: any;
  admin: any;

  constructor(private _httpService: HttpService, private router: Router) {
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }
  ngOnInit() {
    this.checkSession();
    //this.checkAdmin();
    this.receiveMessage(this.session);
  } 

  toggleNavbar()
  {
    this.navbarOpen = !this.navbarOpen;
  }
  toggleHamburger()
  {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  checkSession() {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => {
      this.session = data['user']
      this._httpService.send(this.session)
    })
  }
  // checkAdmin() {
  //   let observable = this._httpService.checkAdmin();
  //   observable.subscribe(data => {
  //     this.admin = data['user']
  //   })
  // }
  receiveMessage(session) {
    this.session = session;
  }
  logout() {
    let observable = this._httpService.logout();
    observable.subscribe(data => {
      console.log("coming back", data);
      this.checkSession();
      this.admin = false;
      this._httpService.send(this.session)
      location.reload();
    })
  }
}
