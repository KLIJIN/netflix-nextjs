import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Modal from "@mui/material/Modal";
import { FaPlay, FaPauseCircle } from "react-icons/fa";
import { VolumeOffIcon, VolumeUpIcon, XIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { movieState } from "../atoms/modalAtom";
import { Movie, Video, Genre } from "../typings";

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

export default function ModalComponent({ showModal, closeModal }: Props) {
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState<boolean>(true);
  // const [addedToList, setAddedToList] = useState(false);
  const [playing, setPlaying] = useState<boolean>(true);

  const fetchMovie = async () => {
    const query = await axios
      .get(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
      .then((res) => res);
    if (query?.data?.videos) {
      const index: number = query.data.videos.results.findIndex(
        (element: Video): boolean => element.type === "Trailer"
      );
      setTrailer(query?.data?.videos.results[index].key);
    }

    if (query?.data?.genres) {
      setGenres(query.data.genres);
    }
  };

  useEffect(() => {
    if (movie) {
      fetchMovie();
    }
  }, [movie]);

  return (
    <Modal
      open={showModal}
      onClose={closeModal}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden 
    overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={closeModal}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] 
          hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing={playing}
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <button
              className="flex items-center gap-x-2 rounded bg-white px-8 py-1 text-xl font-bold
               text-black transition hover:bg-[#e6e6e6]"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? (
                <FaPlay className="h-7 w-7 text-black" />
              ) : (
                <FaPauseCircle className="h-7 w-7 text-black" />
              )}
              Play
            </button>

            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* discription */}
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {(movie!.vote_average * 10).toFixed(0)}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div
                className="flex h-4 items-center justify-center rounded border
               border-white/40 px-1.5 text-xs"
              >
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}
