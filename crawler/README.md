# Crawler
Crawler is a web-crawler that looks for prices for specific keyboard parts. It is based on the jsoup, and jersey libraries for HTML parsing, and REST respectively.
## Usage
To build the jar file, run `mvn package`
To run the application, run `mvn clean compile exec:java`
## Development
Crawler uses REST, and listens on port 3000 for incoming requests. To connect from within a docker image, it should be as simple as making a post request to the following link: `http://crawler:3000/prices/lookup`.
Crawler expects a JSON document with only one field, `uri`. The `uri` field should contain a link to the webpage that is to be queried for its price. If the link does not exist, an internal server error (500) will be returned. If it could not find the price on the page specified by `uri`, a price of `-1.0` will be returned. Otherwise, the API will return a JSON document containing the fields `lowestPrice`, and `pricehistory`.
## Known Issues
At startup, the application will spit out a few thousand lines of errors, despite the application starting successfully.
## TODOList
- [X] REST API.
- [X] Ability to scan webpages for prices upon request.
- [ ] Fix/suppress errors at startup.
- [ ] Automatically update prices from a set of URIs.
## Documentation
This documentation describes the available REST methods.
### (GET) "/prices"
Used to ensure that the REST server is running by returning `If you can read this message, it *should* be working`.
### (POST) "/prices/lookup"
Looks up the price of a given part, at a given uri. The result is not stored in the document, but the json representation of the pricestamp is returned.

#### Parameters:
+ `uri` = URI of the webpage to scan the price of.

#### Returns:
200 OK if successful, 500 Internal Server Error if unsuccessful. Pricestamp in JSON format.
### (POST) "/prices/addUri"
Adds a uri to an existing uriCollection, which is a collection of pricestamps, and is used to track the price of a part over time by scanning a list of URIs and updating the pricestamps in an array.

#### Parameters:
+ `slug` = Slug of the collection that is tracking the prices.
+ `uri` = The uri to add to the price collection.

#### Returns:
200 OK if successful, 500 Internal Server Error if unsuccessful.

### (POST) "/prices/newCollection"
Creates a new uriCollection with a given slug and set of URIs.

#### Parameters:
+ `slug` = Slug that is used to reference this uri collection.
+ `uris` = Optional array of URI links that link to webpages that will be scanned for their prices.

#### Returns:
200 OK if successful, 500 Internal Server Error if unsuccessful.

### (POST) "/prices/updatePrices"
Update the prices of a given uriCollection from a provided slug.

#### Parameters:
+ `slug` = The slug that is used to reference the URI collection.

#### Returns:
200 OK if successful, 500 Internal Server Error if unsuccessful.
