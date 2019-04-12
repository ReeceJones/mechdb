package mechdb;

// java library imports
import java.util.List;
import java.util.ArrayList;
import java.io.IOException;
import java.time.Instant;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.lang.Double;

// jsoup imports
import org.jsoup.*;
import org.jsoup.nodes.*;
import org.jsoup.select.*;

import org.bson.Document;

// our own modules
import mechdb.SiteLookup;

/*
better definition of a price stamp:
price of a given object at any point int time
priceStamp:
{
    lowestPrice: Double,
    lowestUri: String
    instant: String
    prices: [
        {
            uri: String
            price: Double
        },
        ...
    ]
}

*/

public class PriceStamp {
    // The price of this specific stamp
    private double price = Double.MAX_VALUE;
    // The uri of the lowest price part of whatever idk you figure it out yourself bud
    private String uri = "";
    // The point in time of this specific stamp
    private String instant;
    // list of prices at this point in time
    List<Point> prices;

    // construct without any data
    public PriceStamp() {
        instant = Instant.now().toString();
        prices = new ArrayList<Point>();
    }

    public PriceStamp(List<String> uris) {
        this();
        prices.clear();
        for (int i = 0; i < uris.size(); i++) {
            getPoint(uris.get(i));
        }
    }

    private Point getPoint(String link) {
        Point p = new Point();
        p.uri = link;
        try {
            this.getPotentialPrices(link).get(0);
        } catch (Exception ex) {
            p.price = Double.MAX_VALUE;
        }
        return p;
    }

    // scans a webpage and returns potential prices in the order of how likely it is to be the actual price
    public ArrayList<Double> getPotentialPrices(String link) throws IOException {
        ArrayList<Double> potentialPrices = new ArrayList<Double>();

        // compile our regex pattern
        final Pattern pattern = Pattern.compile("(\\$?[0-9]*.?[0-9]*)");
        final Pattern replacePattern = Pattern.compile("[^0-9.]");
        String domain = SiteLookup.getDomain(link);
        // get the selector rule for this website
        String selector = SiteLookup.getSelector(domain);

        Elements elements;
        // download and parse the site
        elements = Jsoup.connect(link).get().select(selector);

        for (Element element : elements) {
            // create matcher
            Matcher matcher = pattern.matcher(element.text());

            // check to make sure that the data region contains only the price, and nothing else
            // if it contains something else, then we skip over this element
            System.out.println(element.text() + " : " + matcher.matches());
            if (!matcher.matches())
                continue;

            Matcher replacer = replacePattern.matcher(element.text());
            // convert to double
            double p = Double.valueOf(replacer.replaceAll(""));

            // add to list of potential prices
            potentialPrices.add(p);
        }
        sortByLikelyhood(potentialPrices);
        // uri, price
        if (potentialPrices.size() > 0)
        {
            double x = potentialPrices.get(0).doubleValue();
            prices.add(new Point(link,x));
            if (x < price)
            {
                this.uri = link;
                this.price = x;
            }
        }
        return potentialPrices;
    }

    // Getter for the price (lowst price)
    public double getPrice() {
        return price;
    }

    public void setPrice(double p) {
        price = p;
    }

    public String getURI() {
        return uri;
    }

    public void setURI(String s) {
        uri = s;
    }

    public List<Point> getPrices() {
        return prices;
    }

    public void setPrices(List<Point> l) {
        prices = l;
    }

    // Getter for the point in time
    public String getInstant() {
        return instant;
    }

    public void setInstant(String s) {
        instant = s;
    }

    public Document toDocument() {
        Document doc = new Document();
        doc.put("lowestPrice", price);
        doc.put("lowestUri", uri);
        doc.put("instant", instant);
        // convert list array into document array
        List<Document> arr = new ArrayList<Document>();
        for (Point p : prices) { 
            Document d = new Document();
            d.put("uri", p.uri);
            d.put("price", p.price);
            arr.add(d);
        }
        doc.put("prices", arr);
        return doc;
    }

    // arbitrary value that returns how likely a given price is
    private double likelyhoodFactor(Double price) {
        final double maxPts = 1.0;
        double l = maxPts;
        
        // first if the price is way to high or way to low
        if (price > 1000.0)
            l -= 0.2;
        else if (price < 0.0)
            l -= 0.2;

        // its going to be way off
        if (price > 10000.0)
            l -= 0.4;

        return l;
    }

    // comparison function for sortByLikelyhood
    private int comparePrices(Double p1, Double p2) {
        return (int)((likelyhoodFactor(p1) -likelyhoodFactor(p1)) * 100.0);
    }

    // sorts prices by their given likely hood by calculating their likelyhood with likelyhoodFactor
    private void sortByLikelyhood(ArrayList<Double> prices) {
        prices.sort((p1, p2) -> comparePrices(p1, p2));
    }
}