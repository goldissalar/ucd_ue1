import { Kindergarden } from "./Kindergarden";

export interface Child {
    id: string;
    name: string;
    birthDate: string,
    kindergardenId: number
  }

  export interface ChildResponse {
    id: string;
    name: string;
    birthDate: string,
    creationDate: string,
    [key: string]: any;
    kindergarden: Kindergarden,
    kindergardenId: number
  }
