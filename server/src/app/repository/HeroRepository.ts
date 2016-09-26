/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

import HeroModel = require("./../model/HeroModel");
import IHeroModel = require("./../model/interfaces/HeroModel");
import HeroSchema = require("./../dataAccess/schemas/HeroSchema");
import RepositoryBase = require("./BaseRepository");

class HeroRepository  extends RepositoryBase<IHeroModel> {

    constructor () {
        super(HeroSchema);
    }

    retrieveIn (callback: (error: any, result: any) => void) {
        this._model.find({}).
        	populate('parent').
        	exec(callback);
    }
}

Object.seal(HeroRepository);
export = HeroRepository;