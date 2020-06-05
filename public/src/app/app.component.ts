/* 
  ||--------------------------------||
  ||   Main Component for Website   ||
  ||--------------------------------||
*/

import { Component, enableProdMode } from '@angular/core'; enableProdMode();
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = "Myriathon";
  navbarOpen = false;
  hamburgerOpen = false;
  session: any;
  admin: any;

  constructor(private _httpService: HttpService, private router: Router, private titleService: Title) {
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

/* 
  ||--------------------------------||
  ||       On Init Functions        ||
  ||--------------------------------||
*/

  ngOnInit() {
    this.setTitle("Myriathon | Home");
    this.checkSession();
    this.checkAdmin();
    this.receiveMessage(this.session);
  } 

  /* Set Title for document header for browser */

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  /* This will toggle the side navbar for the browser */ 

  toggleNavbar()
  {
    this.navbarOpen = !this.navbarOpen;
  }

  /* This will toggle the hamburger menu on smaller screens */

  toggleHamburger()
  {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  /* This will check the user's session information.  If session is null from server, nothing will happen.  If session is available, then it'll store */

  checkSession() {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => {
      this.session = data['user']
      this._httpService.send(this.session)
    })
  }

  /* This will check the session's data from the server, and if the data returned has the user admin equal to true, Angular will store admin as the user. */

  checkAdmin() {
    let observable = this._httpService.checkAdmin();
    observable.subscribe(data => {
      this.admin = data['user']
    })
  }

  /* This is for passing session data accross the angular components */

  receiveMessage(session) {
    this.session = session;
  }

  /* Logout function from Angular */

  logout() {
    let observable = this._httpService.logout();
    observable.subscribe(data => {
      this.checkSession();
      this.admin = false;
      this._httpService.send(this.session)
      location.reload();
    })
  }

}
