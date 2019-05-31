import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule }    from '@angular/common/http';


import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {DialogModule} from 'primeng/dialog';
import {CarouselModule} from 'primeng/carousel';
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ProgressBarModule} from 'primeng/progressbar';





import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MultiSelectModule} from 'primeng/multiselect';



import { FlexLayoutModule } from '@angular/flex-layout';


import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { FilterPokemonPipePipe } from './filter-pokemon--pipe.pipe';
import { PokedexService } from './service/pokedex.service';


@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    FilterPokemonPipePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    PanelModule,
    CardModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    DialogModule,
    NgbModule,
    CarouselModule,
    MatProgressBarModule,
    MenubarModule,
    MultiSelectModule,
    DropdownModule,
    TabViewModule,
    ScrollPanelModule,
    ProgressBarModule
  ],
  providers: [PokedexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
