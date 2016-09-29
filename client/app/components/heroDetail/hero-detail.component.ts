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
            if (heroes == null) {
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
            var that = this;
            if ( $('.chosen-select').length > 0) {
                $(function() {
                    $('.chosen-select').chosen().change(that.parentChange);
                    $('.chosen-select-deselect').chosen({ allow_single_deselect: true }).change(that.parentChange);
                });
                this.init = true;
            }
        }
    }

    save() {
        var selectedChild: string[] = $('#child-select').val();
        this.hero.child = [];
        if (selectedChild && this.heroes) {
            for (var i = 0; i < selectedChild.length; i++) {
                var parentId = selectedChild[i];
                for (var j = 0; j < this.heroes.length; ++j) {
                    var eachHero = this.heroes[j];
                    if (eachHero._id === parentId) {
                        this.hero.child.push(eachHero);
                        break;
                    }
                }
            }
        }

        this.heroService
        .save(this.hero)
        .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack();
            })
            .catch(error => this.error = error); // TODO: Display error message
        }

        parentChange(target, event) {
            console.log(target);
        }

        goBack() {
            window.history.back();
        }

        getOther() {
            var that = this;
            if (this.heroes == null || this.heroes.length == 0) {
                return [];
            }
            var data = this.heroes.filter(function(el){
            // Remove self
            if (el._id === that.hero._id) {
                return false;
            }

            if (that.hero.father != null && that.hero.father._id === el._id) {
                return false;
            }

            if (that.hero.mother != null && that.hero.mother._id === el._id) {
                return false;
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

                // Remove current spouse
                if (that.hero.spouse !== null && el._id === that.hero.spouse._id) {
                    return false;
                }

                return true;
            });
            return data;
        }
    }