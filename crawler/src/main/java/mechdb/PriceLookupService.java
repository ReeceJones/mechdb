package mechdb;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Response;
import org.bson.Document;
import java.io.IOException;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.ArrayList;

import org.bson.Document;

import mechdb.MechDB;
import mechdb.PriceStamp;
import mechdb.PriceCollection;

@Path("prices")
public class PriceLookupService
{
    @GET @Produces(MediaType.TEXT_PLAIN) public String getHello() {
            return "If you can read this message, it *should* be working";
    }
    @POST @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON) 
    @Path("lookup") public Response lookupPrice(String data) {
        String uri = (String)Document.parse(data).get("uri");

        System.out.println(uri);

        PriceStamp stamp = new PriceStamp();
        try {
            ArrayList<Double> prices = stamp.getPotentialPrices(uri);
            System.out.println(prices);
        } catch (IOException e) {
            return Response.status(500).build();
        }
        return Response.status(200).entity(
            stamp.toDocument().toJson()
        ).build();
    }
    @POST @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    @Path("addUri") public Response addUriToCollection(String data) {
        Document doc = Document.parse(data);
        String slug = doc.getString("slug");
        String uri = doc.getString("uri");

        PriceCollection collection = new PriceCollection(slug);
        collection.addUri(uri);
        collection.store();

        return Response.status(200).build();
    }
    @POST @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    @Path("newCollection") public Response newCollection(String data) {
        Document doc = Document.parse(data);
        String slug = doc.getString("slug");
        List<String> uris = doc.getList("uris", String.class);
        
        // since uris is optional, we check to see if it exists in the document
        if (uris == null) { // it doesn't so we just ignore it
            uris = new ArrayList<String>();
        }

        PriceCollection collection = new PriceCollection(slug, uris);

        collection.store();

        return Response.status(200).build();
    }
    @POST @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    @Path("updatePrices") public Response updatePrices(String data) {
        String slug = Document.parse(data).getString("slug");

        PriceCollection collection = new PriceCollection(slug);

        collection.updatePrices();

        return Response.status(200).build();
    }
}
