import { Component, OnInit } from '@angular/core';

import { HeroService } from "../../services/hero.service";
import { Hero } from "../../models/hero";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'family-tree',
    styleUrls: ['./app/components/familyTree/family-tree.component.css'],
    templateUrl: './app/components/familyTree/family-tree.component.html',
    providers: [HeroService]
})
export class FamilyTreeComponent implements OnInit  {

    hero: Hero;
    family: Hero[] = [];
    private isLoading = true;
    selectedHero: Hero;

    constructor(private heroService: HeroService,
        private router: Router,
        private activeRoute: ActivatedRoute) { }

    getTree(id: string) {
        this.heroService.getHero(id).then(
            hero => this.hero = hero,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    ngOnInit(): void {

        console.log(this.activeRoute);
        this.activeRoute.params.forEach((params : Params) => {
            let id: string = params['id'];
            console.log("Selected id " + id);
            if (id != null) {
                this.getTree(id);
            } else {
                this.getTree(id);
            }
        });
    }

    onSelect(hero: Hero): void {
        console.log("Ok i click");
        this.getTree(hero._id);
    }

}