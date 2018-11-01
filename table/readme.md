## Goal

Build a `Table` component in React, using it in our mini web app to load in and display data from a Star Wars API. We'll be using a live API endpoint for grabbing Star Wars characters of which the documentation is located here: https://swapi.co/documentation#people, An example API response is here: https://swapi.co/api/people

We've provided a scaffold using `create-react-app` to get started. We've also included **styled-components** which is a CSS-in-JS library we use here at Timber, but please don't feel obligated to use it. CSS Modules / other CSS solutions are okay too!

We want the project to respect your time and take no more than 4 hours, but you're free to take as much time as you like. Feel free to drop in a `solution.txt` for anything you'd like to explain about your solution.

## Design
| Static Design         | Interactions (Sorting)          |
| --------------------- |:-------------------------------:|
| ![Imgur](https://i.imgur.com/75A3tNo.png) | ![sort_table](https://user-images.githubusercontent.com/4651424/47865092-b470e100-ddd1-11e8-9210-ae4d3bf56559.gif) |


## Base Requirements
- Table component should be generic enough to take in any array of data, and display it.
  - Most likely you'll need in a `rows` and `columns` prop.
- Be able to custom render a column of data.
  - Each row of data from the API will have a `created` and `edited` property, of which an example value might be `2014-12-09T13:50:51.644000Z`. A custom renderer could coarse this value into a nicer format like `12/9/2014`.
  - hint: `Date.prototype.toLocaleDateString` is a good function for the above case.

- Be able to sort a column of data when a column is clicked.
  - If the `Name` column is clicked, it should sort the rows by descending order.
  - If another column is clicked, it should change the active sort.
  - If the same column is clicked, it should toggle the sort order by ascending / descending.
  - Custom sorts per column should be supported. I should be able to define a different sort function for different types of values such as string vs numerical values.

- Call out to the Star Wars API endpoint at https://swapi.co/api/people, and load in the data to your Table component.
  - Please include a loading state for your Table, for when you are waiting for the HTTP response to come back.
  - Feel free to use an HTTP request library of your choice or the new built-in Fetch API: (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
#### Example Fetch API Call
```
fetch('https://swapi.co/api/people', { method: 'GET' })
  .then(response => response.json())
  .then(data => data)
```

## Bonus
Please only tackle these if you have time to spare, or if you just want to show off more of what you know!
- Write tests for the `Table` component on anything you see that needs more test coverage. We've included a `Table.spec.js` file using **Jest** / **Enzyme** which can allow you to get started, but feel free to bring in a unit testing library of your own if you prefer. (Jest Docs: https://jestjs.io/ Enzyme Docs: https://airbnb.io/enzyme/)

## Available NPM Scripts

This demo project was bootstrapped with `create-react-app`, and as such comes with some convenient `npm` scripts. In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
