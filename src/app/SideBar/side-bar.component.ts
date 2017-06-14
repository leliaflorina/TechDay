import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    PLATFORM_ID,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { SidebarContainer } from './side-container.component';
import { SidebarService } from './side-bar.service';

@Component({
    selector: 'side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: [`./side-bar.component.css`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar implements OnInit, OnChanges, OnDestroy {
    // `openedChange` allows for "2-way" data binding
    @Input() opened: boolean = false;
    @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() mode: 'over' | 'push' | 'slide' = 'over';
    @Input() dock: boolean = false;
    @Input() dockedSize: string = '0px';
     @Input() position: 'start' | 'end' | 'left' | 'right' | 'top' | 'bottom' = 'start';

    @Input() sidebarClass: string;
    /** @internal */
    @Output() _onRerender: EventEmitter<null> = new EventEmitter<null>();

    /** @internal */
    @ViewChild('sidebar') _elSidebar: ElementRef;

    private _isBrowser: boolean;

    private _openSub: Subscription;
    private _closeSub: Subscription;
    constructor(
        @Optional() private _container: SidebarContainer,
        private _ref: ChangeDetectorRef,
        private _sidebarService: SidebarService,
        @Inject(PLATFORM_ID) platformId: Object) {
        this._isBrowser = isPlatformBrowser(platformId);
      
        this._normalizePosition();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._openSub = this._sidebarService.onOpen(this.open);
        this._closeSub = this._sidebarService.onClose(this.close);
    }

    ngOnInit() {
            
    }

    ngOnChanges(changes: SimpleChanges): void {
        
    }

    ngOnDestroy(): void {
        if (!this._isBrowser) { return; }

        if (this._openSub) {
            this._openSub.unsubscribe();
        }
        if (this._closeSub) {
            this._closeSub.unsubscribe();
        }

        this._container._removeSidebar();
    }


    // Sidebar toggling
    // ==============================================================================================

    /**
     * Opens the sidebar and emits the appropriate events.
     */
    open(): void {
        if (!this._isBrowser) { return; }

        this.opened = true;
        this.openedChange.emit(true);

        //this.onOpenStart.emit();

        this._ref.detectChanges();        
    }

    
    close(): void {
        if (!this._isBrowser) { return; }

        this.opened = false;
        this.openedChange.emit(false);

       // this.onCloseStart.emit();

        this._ref.detectChanges();
    }

   
    /**
     * @internal
     *
     * Computes the transform styles for the sidebar template.
     *
     * @return {CSSStyleDeclaration} The transform styles, with the WebKit-prefixed version as well.
     */
    _getStyle(): CSSStyleDeclaration {
        let transformStyle: string = null;
        let marginStyle = {};

        // Hides sidebar off screen
        if (!this.opened ) {
           
            const transformDir: string = 'X';
            const translateAmt: string = `${ '-'}100%`;

            //transformStyle = `translate${transformDir}(${translateAmt})`;
         
        }

        return Object.assign(marginStyle, {
            webkitTransform: transformStyle,
            transform: transformStyle
        }) as CSSStyleDeclaration;
    }

 
    get _dockedSize(): number {
        return parseFloat(this.dockedSize);
    }

    /**
     * @internal
     *
     * Returns whether the sidebar is over mode.
     *
     * @return {boolean} Sidebar's mode is "over".
     */
    get _isModeOver(): boolean {
        return this.mode === 'over';
    }

    /**
     * @internal
     *
     * Returns whether the sidebar is push mode.
     *
     * @return {boolean} Sidebar's mode is "push".
     */
    get _isModePush(): boolean {
        return this.mode === 'push';
    }

    /**
     * @internal
     *
     * Returns whether the sidebar is slide mode.
     *
     * @return {boolean} Sidebar's mode is "slide".
     */
    get _isModeSlide(): boolean {
        return this.mode === 'slide';
    }

    /**
     * @internal
     *
     * Returns whether the sidebar is "docked" -- i.e. it is closed but in dock mode.
     *
     * @return {boolean} Sidebar is docked.
     */
    get _isDocked(): boolean {
        return this.dock && this.dockedSize && !this.opened;
    }

    /**
     * @internal
     *
     * Returns whether the sidebar is inert -- i.e. the contents cannot be focused.
     *
     * @return {boolean} Sidebar is inert.
     */
    get _isInert(): boolean {
        return !this.opened && !this.dock;
    }

    /**
     * "Normalizes" position. For example, "start" would be "left" if the page is LTR.
     */
    private _normalizePosition(): void {       
        if (this.position === 'start') {
            this.position =  'left';
        } else if (this.position === 'end') {
            this.position = 'right' ;
        }
    }
}