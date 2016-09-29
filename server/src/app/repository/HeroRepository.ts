/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

import HeroModel = require("./../model/HeroModel");
import IHeroModel = require("./../model/interfaces/HeroModel");
import HeroSchema = require("./../dataAccess/schemas/HeroSchema");
import RepositoryBase = require("./BaseRepository");
import mongoose = require("mongoose");

class HeroRepository extends RepositoryBase<IHeroModel> {

    constructor () {
        super(HeroSchema);
    }

    getTree (_id: string, callback: (error: any, result: mongoose.Document) => void) {
    	var that = this;
        this._model.findById( _id).exec(callback);
    }
}

Object.seal(HeroRepository);
export = HeroRepository;