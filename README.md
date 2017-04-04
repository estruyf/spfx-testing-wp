# SPFx sample project with some predefined unit tests

This is a sample project which contains some predefined React component unit tests. In the project, you find a standard SPFx web part with one addition that it shows a list based on an async call (makes use of the MockHttpClient).

![Web part render](/assets/wp-render.png)

The project contains the following tests:
- Check if the component contains a paragraph
- Check if the component renders the specified description
- Check if the component contains a list element
- Check if the results state is null. This should be the case on first load.
- Check if the `componentDidMount` method gets called
- Check if the component has rendered three items in the list. These items are coming from the `MockHttpClient`.
- Check in which the component state gets updated from the test itself and checking if the right number of items are rendered in the list. 

When you run the tests, the result should look like this:

![Test results](/assets/test-results.png)

## Extra dependencies
As this is a test sample for testing React components, I made use of the following extra testing dependencies:
- [enzyme]( http://airbnb.io/enzyme)
- react-addons-test-utils

These dependencies are also specified in the `package.json` file. So, once you run `npm install` they will automatically get downloaded.

## HelloWorld.test.ts is with changed extention to TSX (JSX templating enabled)
The detault HelloWorld.test.ts that comes with the SPFx yo man generator is wtih changed extention to TSX so the JSX templating syntax is available. This is useful when we mount element with enzyme. Example: '''renderedElement = mount(<HelloWorld description={descTxt} />);'''

## How to use it?

- Clone this repo
- Run `npm install`
- Run `gulp test`
