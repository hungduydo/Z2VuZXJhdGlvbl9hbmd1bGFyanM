/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

import IHeroModel = require('./interfaces/HeroModel');
import mongoose = require("mongoose");
class HeroModel {

    private _heroModel: IHeroModel;

    constructor(heroModel: IHeroModel) {
        this._heroModel = heroModel;
    }
    get name (): string {
        return this._heroModel.name;
    }

    get birthPlace (): string {
        return this._heroModel.birthPlace;
    }

    get address (): string {
        return this._heroModel.address;
    }

    get gender (): string {
        return this._heroModel.gender;
    }

    get birth (): string {
        return this._heroModel.birth;
    }

    get death (): string {
        return this._heroModel.death;
    }

    get spouse (): string {
        return this._heroModel.spouse;
    }

    get child (): string[] {
        return this._heroModel.child;
    }

    get father (): string {
        return this._heroModel.father;
    }

    get mother (): string {
        return this._heroModel.mother;
    }
    
}
Object.seal(HeroModel);
export =  HeroModel;