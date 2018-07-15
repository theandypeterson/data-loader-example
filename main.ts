import * as Examples from './examples';

const main = async () => {
  // Example 1 - Demonstrate repositories working with data loaders.
  await Examples.Example1.run();

  // Example 2 - Demonstrate the caching of data loaders.
  await Examples.Example2.run();

  // Example 3 - Demonstrate the potential caching issues caused by data loaders.
  await Examples.Example3.run();

  // Example 4 - Demonstrate an improved create function that deals with caching issues.
  await Examples.Example4.run();
}

main();
