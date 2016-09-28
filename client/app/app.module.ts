import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { HeroesComponent }      from './components/heroes/heroes.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroDetailComponent }  from './components/heroDetail/hero-detail.component';
import { PersonalDetailComponent }  from './components/personalDetail/personal-detail.component';
import { FamilyTreeComponent }  from './components/familyTree/family-tree.component';
import { HeroService }  from './services/hero.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
    ],
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent,
    PersonalDetailComponent,
    FamilyTreeComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
