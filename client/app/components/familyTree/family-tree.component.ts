import { Component, OnInit } from '@angular/core';

import {HeroService} from "../../services/hero.service";
import {Hero} from "../../models/hero";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'my-heroes',
    styleUrls: ['app/heroes.component.css'],
    templateUrl: 'app/heroes.component.html',
    providers: [HeroService]
})
export class HeroesComponent implements OnInit  { 

    heroes: Hero[];
    family: Hero[] = [];
    private isLoading = true;
    selectedHero: Hero;

    constructor(private heroService: HeroService,
        private router: Router,
        private activeRoute: ActivatedRoute) { }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    getPersons(id: string) {
        this.heroService.getHero(id).subscribe(
            data => this.family[0] = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    ngOnInit(): void {
        
        console.log(this.activeRoute);
        this.activeRoute.params.forEach((params: Params) => {
            let id: string = params['id'];
            console.log("Selected id " + id);
            if(id != "") {
               this.getPersons(id.toString());
            } else {
                this.getPersons("0");
            }
            
        });
    }

    onSelect(hero: Hero): void {
        console.log("Ok i click");
        this.getPersons(hero._id);
    }

}