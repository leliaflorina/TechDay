import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Sidebar } from './SideBar/side-bar.component';
import { SidebarContainer } from './SideBar/side-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _opened: boolean = false;  

  private _MODES: Array<string> = ['over', 'push', 'slide'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];

  private newItem:string= "Test";
  private listOfTasks: string[]=[];
  private addName(){
    this.listOfTasks.push(this.newItem);
  }
 

  private _toggleOpened(): void {
    this._opened = !this._opened;
  }
 
  private _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  private _onOpened(): void {
    console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  private _onClosed(): void {
    console.info('Sidebar closed');
  }

 
}
