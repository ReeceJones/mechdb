# Requirements

- Docker & docker-compose packages (requires Linux or OSX)
- Git (have a look at GitKraken for a GUI)
- Code editor (try out [VS Code](https://code.visualstudio.com/) and its [extension pack](https://marketplace.visualstudio.com/items?itemName=mubaidr.vuejs-extension-pack) if you don't have a preferred editor already)

# Get started

_Note : This will use port 80 of your computer. You may need to shut down Apache if it is already running on your machine (that would get you a "port allocated" error)._

Before being able to run the website, you'll need to run the following commands:

```
# make sure all dependencies are met
docker-compose run api yarn install
docker-compose run web yarn install

# generate admin user
docker-compose run api yarn bootstrap
```

Now start the website by typing in a terminal window (in the root folder of this repo same as this README) :

```
docker-compose up
```

Then open your web browser: [http://localhost](http://localhost)

To access MongoDB client (UI for mongodb), open [http://0.0.0.0:3333](http://0.0.0.0:3333) in your browser and use `db` as Host, and `website` as Database name.

# Development

Everything is hot-reloaded (meaning you just change the code, and the API or website restarts itself).

## Front-end

Front-end is in the `web` folder.

It is based on [NuxtJS framework](https://nuxtjs.org/), which is an extension of [VueJS](https://vuejs.org/). Both frameworks have an extensive documentation, very clear and thorough, you will want to have a good knowledge of how they work.

CSS elements are based on [Bulma](https://bulma.io/documentation), and more specifically [Buefy](https://buefy.org/documentation) which is the VueJS implementation of the Bulme components. **Refer to Buefy documentation** for custom components.

Icons used are listed on [materialdesignicons.com](https://materialdesignicons.com/).

## Back-end

Back-end is in the `api` folder.

It is based on [Express](https://expressjs.com), a NodeJS framework to make web servers.
