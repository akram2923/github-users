import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";

import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [GithubUsers, setGithubUser] = useState(mockUser);
  const [Repos, setRepos] = useState(mockRepos);
  const [Followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState();
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState({ show: true, msg: "" });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data: { rate: limit } }) => {
        let { remaining } = limit;

        setRequests(remaining);
        if (remaining === 0) {
          errorToggler(true, "you have exceed your hourly requestsS");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const errorToggler = (error = true, msg = "") => {
    setError({ show: error, msg: msg });
  };

  const fethUser = async (user) => {
    
    try {
      setLoading(true);
      const { data } = axios.get(`${rootUrl}/users/${user}`).then((data) => {
        console.log(data.data);
        const {login, followers_url} = data.data

        axios.get(`${rootUrl}/users/${login}/repos?per_page=100`).then((res)=>{
          console.log(res)
          setRepos(res.data)
        })
       
        axios.get(`${followers_url}?per_page=100`).then((res)=>{console.log(res)
        
          setFollowers(res.data)})


        if(data){
          setGithubUser(data.data);
        }else{
          errorToggler(true,'user not found')
          console.log('data not found')
        }
        setLoading(false)
      });
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  };
  return (
    <GithubContext.Provider
      value={{ GithubUsers, Followers, Repos, requests, Error, fethUser , loading }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
 