# Movies finder

Cool application to search for your favorite movie or series.

Once you click on the "search" button, all items will appear grouped by year, starting from the most recent.
Each item is represented by a card containing

- the title
- a link to it's imdb page
- the media poster.

If you click on the poster you will be redirected to another page showing more details about the clicked item.

The project is available on gh-pages through the url https://esterpermon.github.io/movie-search . Note that direct access to the details page of a movie (e.g., https://esterpermon.github.io/movie-search/medias/tt14177296) is not possible on GitHub Pages using the BrowserRouter.

### Considerations

- With the goal of providing the best UX, I've decided to first fetch all available records, in order to proper sort and group them. The down side of this approach is that the loading time might take a bit long
- The search is only executed once you click on the button. So just pressing Enter won't work
- Although the API docs says that searching by episode is supported, setting this param to the request seems to always return empty results. Therefore I decided not to support episode as a search param.
- It's important to keep in mind that this project's working time was only a few hours, so I had to compromise in order to deliver a working MVP. Here's a few features I would've implemented with more time:
  - Better UI for details page
  - Visual differentiation between movies and series cards
  - Better loading progress UI
  - Triggering search also by clicking enter button or changing searc type
  - Unit tests for sorting and grouping logic & e2e tests with Cypress

## Available Scripts

### `yarn install`

Run this first to install all dependencies

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
