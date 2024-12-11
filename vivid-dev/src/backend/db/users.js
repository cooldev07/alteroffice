import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "12345678",
    followers: [],
    following: [],
    bookmarks: [],
    profileUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    bio: "I am John Doe",
    website: "https://google.com/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    password: "12345678",
    followers: [],
    following: [],
    bookmarks: [],
    profileUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    bio: "I am Jane Doe",
    website: "https://google.com/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Joe",
    lastName: "Doe",
    username: "joedoe",
    password: "12345678",
    followers: [],
    following: [],
    bookmarks: [],
    profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "I am Joe Doe",
    website: "https://google.com/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Miles",
    lastName: "Tone",
    username: "milestones",
    password: "12345678",
    followers: [],
    following: [],
    bookmarks: [],
    profileUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    bio: "I am Miles Tone",
    website: "https://google.com/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
