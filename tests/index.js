import "./server.js"; // for development server

import REST from "../dist/index.js";

REST.prototype._responseResolver = (res) => {
  return res.data;
};

// RES
const Routes = {
  getUser: "/api/@me",
};

const rest = new REST({
  baseURL: "http://localhost:3000",
  token: "fristroop.com",
});

const get = await rest.get(Routes.getUser, { id: 1 });
console.log(get);
const post = await rest.post(Routes.getUser, {});
console.log(post);
const put = await rest.put(Routes.getUser, {});
console.log(put);
const remove = await rest.delete(Routes.getUser, {});
console.log(remove);
