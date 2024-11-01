# Note on testing

I added some basic unit tests. It looks like I may have configured something wrong while setting up jest / react-testing-library.

I didn't want to run way past the 2 hour limit debugging this, but basically there's some kind of typescript error coming from react testing library and some of error with how I mocked the fetch. The basic structure of how I set up the test though is how I would implement tests for this.