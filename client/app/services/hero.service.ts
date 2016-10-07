import {Injectable} from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Hero} from "../models/hero";

@Injectable()
export class HeroService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError);
    }

    getHero(id: string):  Promise<Hero> {
        return this.http.get(this.heroesUrl + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getTree(id: string):  Promise<Hero> {
        return this.http.get('api/tree' + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getFamily(id: string):  Promise<Hero> {
        return this.http.get('api/tree' + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(hero: Hero) {
        if (hero._id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    private post(hero: Hero) {

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers : this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private put(hero: Hero) {

        let url = `${this.heroesUrl}/${hero._id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero: Hero) {

        let url = `${this.heroesUrl}/${hero._id}`;

        return this.http
            .delete(url, this.headers)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}