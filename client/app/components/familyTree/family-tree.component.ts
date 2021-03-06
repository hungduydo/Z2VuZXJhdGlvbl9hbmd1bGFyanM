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
        this.heroService.getTree(id).then(
            hero => this.hero = hero,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    ngAfterViewChecked() {

        var listLiTag = document.querySelectorAll('.tree>ul>li>ul>li');
        if(listLiTag.length > 0) {
            var minWidth = 0;
            for (var i = 0; i < listLiTag.length; ++i) {
                var liTag = listLiTag[i];
                minWidth += liTag['offsetWidth'];
            }
            // add padding
            minWidth += 14;
            var treeView = document.querySelector('.tree');
            var center = document.querySelector('.tree>.center');

            center['style']['width'] = minWidth + 'px';
            treeView['scrollLeft'] = (center['offsetWidth'] - treeView['offsetWidth'] )/2;
        }
    }

    ngOnInit(): void {

        console.log(this.activeRoute);
        this.getTree("580498d1dcba0f430d0410c4");
        // this.activeRoute.params.forEach((params : Params) => {
        //     let id: string = params['id'];
        //     console.log("Selected id " + id);
        //     if (!id) {
                
        //     } else {
        //         this.getTree(id);
        //     }
        // });
    }

    onSelect(hero: Hero): void {
        console.log("Ok i click");
        this.getTree(hero._id);
    }

}