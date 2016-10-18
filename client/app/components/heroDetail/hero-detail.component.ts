/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */

 import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
 import {Hero} from "../../models/hero";
 import { ActivatedRoute, Params } from '@angular/router';
 import {HeroService} from "../../services/hero.service";

 @Component({
     selector: 'my-hero-detail',
     templateUrl: './app/components/heroDetail/hero-detail.component.html',
     styleUrls: ['./app/components/heroDetail/hero-detail.component.css']
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

    ngAfterViewChecked() {
        if (!this.init) {
            var that = this;
            if ( $('.chosen-select').length > 0) {
                $(function() {
                    $('.chosen-select').chosen().change(that.valueChange);
                    $('.chosen-select-deselect').chosen({ allow_single_deselect: true }).change(that.valueChange);
                    $('#gender-select').chosen({ allow_single_deselect: true, disable_search :true }).change(that.genderChange);

                    $(".chosen-select-deselect").bind("DOMSubtreeModified", that.selectStructureChange);
                    $('.chosen-select').chosen().bind("DOMSubtreeModified", that.selectStructureChange);
                });
                this.init = true;
            }
        }
    }

    public selectStructureChange = (event) => {
        $(event.currentTarget).trigger("chosen:updated");
        console.log(event);
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
            .catch(error => this.error = error);
    }

    public valueChange = (event) => {

        console.log(event);
        switch (event.currentTarget.id) {
            case "father-select":
            this.hero.father = this.idToHero(event.currentTarget.value);
            break;
            case "mother-select":
            this.hero.mother = this.idToHero(event.currentTarget.value);
            break;
            case "spouse-select":
            this.hero.spouse = this.idToHero(event.currentTarget.value);
            break;
            default:
                // code...
                break;
        }
    }

    public genderChange = (event) => {
        // Apply value change for current current hero
        this.hero.gender = event.currentTarget.value;
    }

    goBack() {
        window.history.back();
    }

    getOther() {
        var that = this;
        if (this.heroes == null || this.heroes.length === 0) {
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

            if (that.hero.child) {
                for (var i = 0; i < that.hero.child.length; ++i) {
                    if (that.hero.child[i]._id === el._id) {
                        return false;
                    }
                }
            }

            return true;
        });
        return data;
    }

    idToHero(id) {
        if (!id) {
            return null;
        }

        for (let i of this.heroes) {
           if (i._id === id) {
               return i;
           }
        }
    }

    getAvailbleSpouse() {
        var that = this;
        if (!this.heroes || this.heroes.length === 0) {
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