import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { XIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { movieState } from "../atoms/modalAtom";
import { Movie } from "../typings";

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

export default function ModalComponent({ showModal, closeModal }: Props) {
  const [movie, setMovie] = useRecoilState(movieState);

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${
        movie?.media_type === "tv" ? "tv" : "movie"
      }/${movie?.id}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&append_to_response=videos`
    ).then((response) => response.json());
    console.log(data);
  };

  const fetchMovie2 = async () => {
    const data = await axios
      .get(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
      .then((res) => {
        console.log(res.data);
      });
    console.log(data);
  };

  useEffect(() => {
    if (!movie) return;
    fetchMovie2();
  }, [movie]);

  return (
    <Modal open={showModal} onClose={closeModal}>
      <>
        <button
          onClick={closeModal}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] 
          hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </>
    </Modal>
  );
}
