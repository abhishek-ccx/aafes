//* Importing React from "react". Required to write components in React.
import React from "react";

//* Importing the Home component from "@/components/Home". The '@' alias usually points to the 'src' or 'source' directory in your project structure.
// import Home from "@/components/Home";
import Login from "@/components/Login";
// import Learn from "@/components/Learn";

//* Declaring the HomePage component as a functional component (React.FC) with TypeScript. React.FC stands for Functional Component, it's a type provided by React for functional components.
const Output: React.FC = () => {
  //* The component returns the Home component as its output.
  return <Login />;
  // return <Learn />;
};

//* Exporting HomePage as the default export of this module. This allows us to import HomePage using a simpler syntax in other parts of our application.
export default Output;
