import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";
import { v1 } from "uuid";
import { Movie } from "../typings";

export const modalState = atom({
  key: `modalState/${v1()}`, // unique key
  default: false, // default falue for atom
});

export const movieState = atom<Movie | DocumentData | null>({
  key: `movieState/${v1()}`,
  default: null,
});
