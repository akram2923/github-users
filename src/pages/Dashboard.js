import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  const {loading} = useContext(GithubContext)
  if(loading) {
    return (
      <main>
      <Navbar></Navbar>
      <Search />
      <img src= {loadingImage}  className='loading-img' />
    </main>
    )
  }
  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />

      <Repos />
    </main>
  );
};

export default Dashboard;
  