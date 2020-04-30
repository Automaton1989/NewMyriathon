import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddVideoPageComponent } from './add-video-page/add-video-page.component';
import { MarathonsPageComponent } from './marathons-page/marathons-page.component';
import { MyriathonPageComponent } from './myriathon-page/myriathon-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AllVideosComponent } from './all-videos/all-videos.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { EditSeasonComponent } from './edit-season/edit-season.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AdminPageComponent,
    AddVideoPageComponent,
    MarathonsPageComponent,
    MyriathonPageComponent,
    AboutPageComponent,
    CarouselComponent,
    AllVideosComponent,
    SingleVideoComponent,
    AdminDashboardComponent,
    UserInfoComponent,
    EditVideoComponent,
    EditSeasonComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
