// * Importing the 'React' default import from the 'react' library.
import React from "react";

// * Importing the 'GlobalProvider' from a local file.
// * This provider will be used to wrap the entire application and provide all necessary contexts to the application.

// * Importing the 'AppProps' type from the 'next/app' library.
// * This type is used to type the props of the custom App component in Next.js.
import type { AppProps } from "next/app";

// * Importing global styles from a local CSS file.
import "@/styles/globals.css";

// TODO: Creating a custom App component.
// * This is a functional component that takes 'AppProps' as its props.
// * It wraps the page component with the 'GlobalProvider'.
function App({ Component, pageProps }: AppProps) {
  // * Returning the 'GlobalProvider' wrapping the page component.
  // * The 'Component' prop is the page component, and 'pageProps' is its props.
  // * The '...' syntax is used to spread the 'pageProps' object into individual props.
  return <Component {...pageProps} />;
}

// * Exporting the custom App component.
export default App;
