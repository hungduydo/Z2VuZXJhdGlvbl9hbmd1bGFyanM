/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

import DataAccess = require('../DataAccess');
import IHeroModel = require("./../../model/interfaces/HeroModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class HeroSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            birthPlace: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            gender: {
                type: String,
                required: false
            },
            birth: {
                type: String,
                required: false
            },
            death: {
                type: String,
                required: false
            },
            child:[{ type: String, ref: 'Heroes' }],
            spouse:{ type: String, ref: 'Heroes' },
            father:{ type: String, ref: 'Heroes' },
            mother:{ type: String, ref: 'Heroes' },
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IHeroModel>("Heroes", HeroSchema.schema);
export = schema;""