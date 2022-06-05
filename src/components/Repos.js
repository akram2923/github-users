import React, { useContext } from "react";
import { act } from "react-dom/test-utils";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { Repos } = useContext(GithubContext);
  let languages = Repos.reduce((accu, current) => {
    const { language, stargazers_count } = current;

    if (!language) return accu;
    if (!accu[language]) {
      accu[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      accu[language] = {
        ...accu[language],
        value: accu[language].value + 1,
        stars: accu[language].stars + stargazers_count,
      };
    }

    return accu;
  }, {});

  const mostUsed = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  });
  console.log(mostUsed);

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);
  console.log(mostPopular);

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={mostUsed} />

        <Doughnut2D data={mostPopular} />
        <Bar3D data={mostUsed} />
      </Wrapper>
    </section>
  );
};
const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;

// let languages = Repos.reduce((accutotal, currItem) => {
//   const { language } = currItem;
//   if (!language) return accutotal;

//   if (!accutotal[language]) {
//     accutotal[language] = { label: language, value: 1 };
//   } else {
//     accutotal[language] = {
//       ...accutotal[language],
//       value: accutotal[language].value + 1,
//     };
//   }

//   return accutotal;
// }, {});
// console.log(languages);
// languages = Object.values(languages)
//   .sort((a, b) => {
//     return b.value - a.value;
//   })
//   .slice(0, 5);
