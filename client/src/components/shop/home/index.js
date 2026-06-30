import React, { Fragment, useReducer } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import { homeState, homeReducer, HomeContext } from "./HomeContext";
import SingleProduct from "./SingleProduct";

const HomeComponent = () => {
  return (
    <Fragment>
      <Slider />
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleProduct />
      </section>
    </Fragment>
  );
};

const Home = () => {
  const [data, dispatch] = useReducer(homeReducer, homeState);

  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
