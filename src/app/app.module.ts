import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'; 


import { AppComponent } from './app.component';
// ng generate component 이름 명령어로 등록하면 편함. 폴더및파일 생성도 하고 modules에 자동 등록됨
import { HeroesComponent } from './heroes/heroes.component'; // 컴포넌트는 NgModule 중 하나에 반드시 등록해야 됨 
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; // ngModel 사용을 위해서 등록
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component'; 



@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent, // 컴포넌트는 NgModule 중 하나에 반드시 등록해야 됨
    HeroDetailComponent,  // 컴포넌트는 NgModule 중 하나에 반드시 등록해야 됨
    MessagesComponent, 
    DashboardComponent, 
    HeroSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // ngModel 사용을 위해서 등록
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
