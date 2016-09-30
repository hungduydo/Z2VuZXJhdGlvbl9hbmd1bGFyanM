/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

import mongoose = require("mongoose");

interface HeroModel extends mongoose.Document {
    birthPlace: string;
    address: string;
    name: string;
    gender: string;
    death: string;
    birth: string;
    child: string[];
    spouse: string;
    father: string;
    mother: string;
}

export = HeroModel;