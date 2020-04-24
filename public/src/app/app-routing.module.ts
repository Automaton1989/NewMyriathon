import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddVideoPageComponent } from './add-video-page/add-video-page.component';
import { MarathonsPageComponent } from './marathons-page/marathons-page.component';
import { MyriathonPageComponent } from './myriathon-page/myriathon-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AllVideosComponent } from './all-videos/all-videos.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserInfoComponent } from './user-info/user-info.component';


const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch: 'full'},
{path: 'home', component: HomepageComponent},
{path: 'admin', component: AdminPageComponent},
{path: 'addvideo', component: AddVideoPageComponent},
{path: 'marathons', component: MarathonsPageComponent},
{path: 'rescue', component: MyriathonPageComponent},
{path: 'about', component: AboutPageComponent},
{path: 'videos', component: AllVideosComponent},
{path: 'video/:title', component: SingleVideoComponent},
{path: 'admin/dashboard', component: AdminDashboardComponent},
{path: 'user/:username', component: UserInfoComponent},
{path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
