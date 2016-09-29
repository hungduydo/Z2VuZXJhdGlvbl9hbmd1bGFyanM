/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */

 import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
 import {Hero} from "../../models/hero";
 import { ActivatedRoute, Params } from '@angular/router';
 import {HeroService} from "../../services/hero.service";

 @Component({
     selector: 'personal-detail',
     templateUrl: './app/components/personalDetail/personal-detail.component.html',
     styleUrls: ['./app/components/personalDetail/personal-detail.component.css']
 })

 export class PersonalDetailComponent implements OnInit {
     @Input() hero: Hero;
     @Input() heroes: Hero[];
     newHero = false;
     init = false;
     error: any;
    navigated = false; // true if navigated here


    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        console.log("ngOnInit");
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id === 'new') {
                this.newHero = true;
                this.hero = new Hero();
            } else {
                this.newHero = false;
                this.heroService.getHero(id)
                .then(hero => this.hero = hero);
            }
        });
    }

    ngAfterViewInit() {

    }

    ngAfterViewChecked() {
        if (!this.init) {
            eval("if ( $('.chosen-select').length > 0) {$(function() {$('.chosen-select').chosen();});this.init = true;}");
        }
    }

    goBack() {
        window.history.back();
    }

}