package mechdb;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

public class MechDB {
    public static MongoClient mongoClient = MongoClients.create("mongodb://db:27017");
    public static MongoDatabase mongoDatabase = mongoClient.getDatabase("website");
    public static MongoCollection<Document> pricestamps = mongoDatabase.getCollection("pricestamps");
}