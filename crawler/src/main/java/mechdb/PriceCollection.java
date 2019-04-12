package mechdb;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

import org.bson.Document;

import mechdb.MechDB;
import mechdb.PriceStamp;
import mechdb.Point;

/*
{
    slug: String,
    uri: String,
    price: Double,
    uriList: [ String ],
    priceHistory: [
        PriceStamp
    ]
}
*/
public class PriceCollection {
    // The slugified name of the part that is 
    private String slug;
    private String lowestUri = "";
    private double lowestPrice = -1.0;

    // optional: use if you want to override the previous price stamps
    // NOTE: THIS is filled when pulling. BE CAREFULL DUMB DUMB
    private List<PriceStamp> prices;
    // optional: use if you want to append price stamps
    private List<PriceStamp> deltaPrices;

    // list that prices are updated from
    private List<String> uriList;

    // default constructor
    public PriceCollection() {
        prices = new ArrayList<PriceStamp>();
        deltaPrices = new ArrayList<PriceStamp>();
        uriList = new ArrayList<String>();
    }

    // construct using slug name, and prices
    public PriceCollection(String slug, List<String> uris) {
        this.slug = slug;
        this.uriList = uris;
        prices = new ArrayList<PriceStamp>();
        deltaPrices = new ArrayList<PriceStamp>();
    }

    public PriceCollection(String slug) {
        this.slug = slug;
        prices = new ArrayList<PriceStamp>();
        deltaPrices = new ArrayList<PriceStamp>();
        uriList = new ArrayList<String>();

        pull();
    }

    public void addUri(String uri) {
        uriList.add(uri);
    }

    public void removeUri(String uri) {
        for (int i = 0; i < uriList.size(); i++) {
            if (uri.equals(uriList.get(i))) {
                uriList.remove(i);
                return;
            }
        }
    }

    public void clearUris() {
        uriList.clear();
    }

    public void pull() {
        Document doc = MechDB.pricestamps.find(new Document("slug", slug)).first();
        if (doc == null)
            return;


        // Map<String, Object> map = new HashMap<String, Object>();
        // map.put("price", lowestPrice);
        // map.put("uri", lowestUri);
        // doc.put("currentPrice", new Document(map));
        
        // lowestUri = doc.getString("lowestUri");
        // lowestPrice = doc.getDouble("lowestPrice").doubleValue();

        Document curr = (Document)doc.get("currentPrice");
        lowestUri = curr.getString("uri");
        lowestPrice = curr.getDouble("price").doubleValue();

        uriList = doc.getList("uriList", String.class);

        prices.clear();

        List<Document> ip = doc.getList("priceHistory", Document.class);

        for (Document d : ip) {
            PriceStamp stamp = new PriceStamp();
            stamp.setPrice(d.getDouble("lowestPrice").doubleValue());
            stamp.setURI(d.getString("lowestUri"));
            stamp.setInstant(d.getString("instant"));
            List<Document> arr = d.getList("prices", Document.class); 
            List<Point> prices = new ArrayList<Point>();
            for (Document z : arr) {
                prices.add(new Point(z.getString("uri"), z.getDouble("price").doubleValue()));
            }
            stamp.setPrices(prices);
            this.prices.add(stamp);
        }
    }

    public void store() {
        long docCount = MechDB.pricestamps.countDocuments(new Document("slug", slug));
        if (docCount > 0)
            update();
        else
            insert();
    }

    // called by store if there is an existing document
    private void update() {
        // find the existing document so that we may modify it
        Document doc = MechDB.pricestamps.find(new Document("slug", slug)).first();

        // easy stuff first
        doc.put("slug", slug);


        // now on to the dumb object array stuff
        // first check if we are going to overrite
        List<Document> arr = doc.getList("priceHistory", Document.class);  
        if (this.prices != null) {
            // clear array if we use optional replace
            arr.clear();
        }

        // merge price lists
        prices.addAll(this.deltaPrices);

        for (PriceStamp stamp : this.prices) {
            arr.add(stamp.toDocument());
        }

        doc.put("priceHistory", arr);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("price", lowestPrice);
        map.put("uri", lowestUri);
        doc.put("currentPrice", new Document(map));
        doc.put("uriList", uriList);

        // finally, we can replace in the database
        MechDB.pricestamps.replaceOne(new Document("slug", slug), doc);
    }

    // called by store if there are no existing documents
    private void insert() {
        // find the existing document so that we may modify it
        Document doc = new Document();

        // easy stuff first
        doc.put("slug", slug);

        List<Document> arr = new ArrayList<Document>();  

        // merge price lists
        prices.addAll(this.deltaPrices);

        for (PriceStamp stamp : this.prices) {
            arr.add(stamp.toDocument());
        }

        doc.put("priceHistory", arr);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("price", lowestPrice);
        map.put("uri", lowestUri);
        doc.put("currentPrice", new Document(map));
        doc.put("uriList", uriList);

        // finally, we can replace in the database
        MechDB.pricestamps.insertOne(doc);
    }

    // updates prices by parsing the shiz. Calls store at the end of the function
    public void updatePrices() {
        // clear prices arrays
        this.deltaPrices.clear();

        PriceStamp stamp = new PriceStamp(this.uriList);

        this.deltaPrices.add(stamp);

        this.lowestUri = stamp.getURI();
        this.lowestPrice = stamp.getPrice();

        this.store();
    }
}

