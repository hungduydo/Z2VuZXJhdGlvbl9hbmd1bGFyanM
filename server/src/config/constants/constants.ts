/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

class Constants {
    static DB_CONNECTION_STRING: string = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://hungdd:7414365698@ds057176.mlab.com:57176/do_family_tree"
}
Object.seal(Constants);
export = Constants;