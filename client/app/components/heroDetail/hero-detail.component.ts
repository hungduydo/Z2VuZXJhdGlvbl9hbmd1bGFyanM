/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */

 import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
 import {Hero} from "../../models/hero";
 import { ActivatedRoute, Params } from '@angular/router';
 import {HeroService} from "../../services/hero.service";

 @Component({
     selector: 'my-hero-detail',
     templateUrl: './app/components/heroDetail/hero-detail.component.html'
 })

 export class HeroDetailComponent implements OnInit {
     @Input() hero: Hero;
     @Input() heroes: Hero[] = [];
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
        this.heroService.getHeroes().then(heroes => {
            if(heroes == null) {
                // code...
            } else {
                this.heroes = heroes;    
            }
        });
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
            if ( $('.chosen-select').length > 0) {
                $(function() {
                    $('.chosen-select').chosen();
                });
                this.init = true;
            }
        }
    }

    save() {
        var selectedParent: string[] = $('#parent-select').val();
        var selectedSpouse: string[] = $('#spouse-select').val();
        this.hero.parent = [];
        if (selectedParent && this.heroes) {
            for (var i = 0; i < selectedParent.length; i++) {
                var parentId = selectedParent[i];
                for (var j = 0; j < this.heroes.length; ++j) {
                    var eachHero = this.heroes[j];
                    if (eachHero._id === parentId) {
                        this.hero.parent.push(eachHero);
                        break;
                    }
                }
            }
        }

        this.hero.spouse = [];
        if (selectedSpouse && this.heroes) {
            for (var i = 0; i < selectedSpouse.length; i++) {
                var spouseId = selectedSpouse[i];
                for (var j = 0; j < this.heroes.length; ++j) {
                    var eachHero = this.heroes[j];
                    if (eachHero._id === spouseId) {
                        this.hero.spouse.push(eachHero);
                        break;
                    }
                }
            }
        }
        // this.hero.parent = selectedParent;
        this.heroService
        .save(this.hero)
        .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack();
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    goBack() {
        window.history.back();
    }

    getOther() {
        var that = this;
        if (!this.heroes || this.heroes.length == 0) {
            return [];
        }
        var data = this.heroes.filter(function(el){
            // Remove self
            if (el._id === that.hero._id) {
                return false;
            }

            // Remove old current parent
            if(that.hero.parent != null) {
                for (let parent of that.hero.parent) {
                    if (el._id === parent._id) {
                        return false;
                    }
                }
            }
            
            return true;
        });
        return data;
    }

    getAvailbleSpouse() {
        var that = this;
        if (!this.heroes || this.heroes.length == 0) {
            return [];
        }
        var data = this.heroes.filter(function(el){
            // Remove self
            if (el._id === that.hero._id) {
                return false;
            }

            // Remove old current parent
            for (let spouse of that.hero.spouse) {
                if (el._id === spouse._id) {
                    return false;
                }
            }
            return true;
        });
        return data;
    }
}