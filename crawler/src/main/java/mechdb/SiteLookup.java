package mechdb;

import com.mongodb.client.FindIterable;
import org.bson.Document;

import mechdb.MechDB;

// class with static fields that gives us various functionalities in regards to websites
public class SiteLookup {


    // gets the html selector used for locating price information on a webpage
    public static String getSelector(String uri) {
        // convert uri to domain name
        String domain = getDomain(uri);
        // query database
        FindIterable<Document> t = MechDB.pricestamps.find(new Document("domain", domain));
        // select first result
        return t.first().get("selector").toString();
    }

    // extract the domain name from a given uri
    public static String getDomain(String uri) {
        String a = uri;
        
        // first remove, our https://www. if it already is there
        a = a.replace("http://", "");
        a = a.replace("https://", "");
        a = a.replace("www.", "");

        int idx = a.indexOf('/');
        return idx == -1 ? a : a.substring(0, a.indexOf('/'));
    }
}