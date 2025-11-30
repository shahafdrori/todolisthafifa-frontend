import { atom } from "jotai";

export type Coordinates = {
  longitude: number;
  latitude: number;
};

export type Task = {
  _id: string;
  name: string;
  priority: number;
  subject: string;
  date: string;
  completed: boolean;
  coordinates: Coordinates;
};

export type InitialData = {
  _id: string;
  name: string;
  priority: number | string;
  subject: string;
  date: string;
  coordinates: Coordinates;
};

export const tasksAtom = atom<Task[]>([]);
export const openFormAtom = atom(false);
export const editModeAtom = atom(false);
export const intialDataAtom = atom<InitialData>({
  _id: "",
  name: "",
  priority: "",
  subject: "",
  date: "",
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
});
export const completeStatusAtom = atom<boolean[]>([false]);
export const searchQueryAtom = atom("");
export const showCompletedAtom = atom(false);

export const markersAtom = atom<[number, number][]>([]);
export const setCoordinatesAtom = atom<number[]>([]);
