import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    PLATFORM_ID,
    SimpleChanges
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Sidebar } from './side-bar.component';

@Component({
    selector: 'side-container',    
     templateUrl: "./side-container.component.html",
    styleUrls: ["./side-container.component.css"],   
    host: {
        '[class.ng-sidebar-container--animate]': 'animate'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarContainer implements AfterContentInit, OnDestroy {
    @Input() animate: boolean = true;

    @Input() allowSidebarBackdropControl: boolean = true;
    @Input() showBackdrop: boolean = false;
    @Output() showBackdropChange = new EventEmitter<boolean>();

    @Input() sidebarContentClass: string;
    @Input() backdropClass: string;
    private _sidebar: Sidebar;
    constructor(
        private _ref: ChangeDetectorRef,
        @Inject(PLATFORM_ID) platformId: Object) {

    }
    ngAfterContentInit(): void {
        this._onToggle();
    }
    ngOnDestroy(): void {
    }
    private _onToggle(): void {

    }
    _addSidebar(sidebar: Sidebar) {
        this._sidebar = sidebar;
        this._subscribe(sidebar);
    }
     _removeSidebar() {
         this._unsubscribe();
     }

    private _subscribe(sidebar: Sidebar): void {
        //sidebar.onOpenStart.subscribe(() => this._onToggle());
        //sidebar.onOpened.subscribe(() => this._markForCheck());

       // sidebar.onCloseStart.subscribe(() => this._onToggle());
        //sidebar.onClosed.subscribe(() => this._markForCheck());    
    }
    private _unsubscribe(): void {
       // this._sidebar.onOpenStart.unsubscribe();
        //this._sidebar.onCloseStart.unsubscribe();
    }

}