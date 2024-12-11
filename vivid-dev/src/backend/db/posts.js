import { v4 as uuid } from "uuid";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content: "Hey there",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        content: "Hello",
        _id: uuid(),
        username: "joedoe",
        createdAt: "11:15 PM May 18,2022",
      },
    ],
    username: "johndoe",
    createdAt: "11:13 PM May 18,2022",
    updatedAt: "11:13 PM May 18,2022",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus etdeleniti atqsint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "joedoe",
    createdAt: "10:13 PM May 16,2022",
    updatedAt: "10:13 PM May 16,2022",
  },
  {
    _id: uuid(),
    content: "Hello world",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "janedoe",
    createdAt: "11:13 AM May 10,2021",
    updatedAt: "11:13 AM May 10,2021",
  },
  {
    _id: uuid(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "joedoe",
    createdAt: "02:00 AM Apr 25,2021",
    updatedAt: "02:00 AM Apr 25,2021",
  },
];
