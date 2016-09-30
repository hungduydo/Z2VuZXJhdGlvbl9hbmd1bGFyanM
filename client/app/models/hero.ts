/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */

export class Hero {
    _id: string;
    birthPlace: string;
    homeAddress: string;
    name: string;
    gender: string;
    birth: string;
    death: string;  
    mother: Hero;
    father: Hero;
    child: Hero[];
    spouse: Hero;
}