import React from "react";
import "./home.css";
import Nav from "../../components/nav/Nav";
import Banner from "../../components/banner/Banner";
import Row from "../../components/rows/Row";
import request from "../../utils/requests";

function Home() {
  return (
    <div className="home">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={request.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
      <Row title="Docmentaries" fetchUrl={request.fetchDocumentaries} />
    </div>
  );
}

export default Home;
