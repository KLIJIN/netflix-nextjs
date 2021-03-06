// import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import type { NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import requests from "../utils/requests";
import { Movie } from "../typings";
import { useEffect, useState } from "react";
import Row from "../components/Row";
import styles from "../styles/Home.module.css";
import useAuthContext from "../hooks/useAuth";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface HomeProps {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  // products: Product[]
}

const Home = () => {
  const [netflixData, setNetflixData] = useState<Movie[] | null>(null);
  const [trendingNow, setTrendingNow] = useState<Movie[] | null>(null);
  const [topRated, setTopRated] = useState<Movie[] | null>(null);
  const [actionMovies, setActionMovies] = useState<Movie[] | null>(null);
  const [comedyMovies, setComedyMovies] = useState<Movie[] | null>(null);
  const [horrorMovies, setHorrorMovies] = useState<Movie[] | null>(null);
  const [romanceMovies, setHomanceMovies] = useState<Movie[] | null>(null);
  const [documentaries, setDocumentaries] = useState<Movie[] | null>(null);

  const { loading } = useAuthContext();
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const showModal = useRecoilValue(modalState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const movie = useRecoilValue(movieState);

  useEffect(() => {
    const getMovies = async () => {
      const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
      ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
      ]);
      // setState's
      setTrendingNow(trendingNow.results);
      setNetflixData(netflixOriginals.results);
      setTopRated(topRated.results);
      setActionMovies(actionMovies.results);
      setComedyMovies(comedyMovies.results);
      setHorrorMovies(horrorMovies.results);
      setHomanceMovies(romanceMovies.results);
      setDocumentaries(documentaries.results);
    };

    getMovies();
  }, []);

  if (loading) {
    return null;
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {netflixData?.length && <Banner netflixOriginals={netflixData} />}
        <section>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal showModal={showModal} closeModal={closeModal} />}
    </div>
  );
};

export default Home;
