import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PowerBIEmbedModule } from 'powerbi-client-angular';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';


// Terceros
import { MatTimepickerModule } from 'mat-timepicker';

// PrimeNG
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { SpeedDialModule } from 'primeng/speeddial';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InplaceModule } from 'primeng/inplace';
import { CheckboxModule } from 'primeng/checkbox';
import { TimelineModule } from 'primeng/timeline';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LayoutComponent } from './layout/layout.component';
import { BadgeModule } from 'primeng/badge';
import { ProfileComponent } from './profile/profile.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {FileUploadModule} from 'primeng/fileupload';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TreeTableModule} from 'primeng/treetable';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Layout2Component } from './layout2/layout2.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {SplitterModule} from 'primeng/splitter';
import { TagModule } from 'primeng/tag';
import { PeriodoPipe } from 'src/app/pipes/periodo.pipe';
import { TerminalModule } from 'primeng/terminal';

import { AutoCompleteModule } from 'primeng/autocomplete';

//SyncFusion
import { PivotViewAllModule, PivotFieldListAllModule } from '@syncfusion/ej2-angular-pivotview'
import { MatDialogModule } from '@angular/material/dialog';


import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [LayoutComponent, ProfileComponent, SidebarComponent, Layout2Component, ToolbarComponent, PeriodoPipe],
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTreeModule,
    MatChipsModule,
    MatProgressBarModule,
    MatMenuModule,
    TreeModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputTextareaModule,
    CardModule,
    PanelMenuModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    PanelModule,
    MenuModule,
    FieldsetModule,
    ToolbarModule,
    DividerModule,
    SpeedDialModule,
    MultiSelectModule,
    ChipModule,
    TabViewModule,
    MessagesModule,
    MessageModule,
    InplaceModule,
    CheckboxModule,
    TimelineModule,
    ScrollTopModule,
    ChartModule,
    OverlayPanelModule,
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    FileUploadModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    TreeTableModule,
    SplitterModule,
    TagModule,
    //PowerBIEmbedModule,
    TerminalModule,
    AutoCompleteModule,
    PivotViewAllModule,
    PivotFieldListAllModule,
    MatDialogModule,
    NgbToastModule,
    NgbTooltipModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTreeModule,
    MatChipsModule,
    MatProgressBarModule,
    MatMenuModule,
    TreeModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputTextareaModule,
    CardModule,
    PanelMenuModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    PanelModule,
    MenuModule,
    FieldsetModule,
    ToolbarModule,
    DividerModule,
    SpeedDialModule,
    MultiSelectModule,
    ChipModule,
    TabViewModule,
    MessagesModule,
    MessageModule,
    InplaceModule,
    CheckboxModule,
    TimelineModule,
    ScrollTopModule,
    ChartModule,
    OverlayPanelModule,
    LayoutComponent,
    Layout2Component,
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    FileUploadModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    TreeTableModule,
    SplitterModule,
    TagModule,
    //PowerBIEmbedModule,
    PeriodoPipe,
    TerminalModule,
    AutoCompleteModule,
    PivotViewAllModule,
    PivotFieldListAllModule,
    MatDialogModule,
    NgbToastModule,
    NgbTooltipModule
  ],
})
export class SharedModule {}
