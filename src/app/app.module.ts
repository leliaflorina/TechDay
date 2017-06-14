import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { Sidebar } from './SideBar/side-bar.component';
import { SidebarContainer } from './SideBar/side-container.component';
import { SidebarService } from './SideBar/side-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    Sidebar,
    SidebarContainer
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
