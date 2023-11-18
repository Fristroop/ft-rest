import express from "express";
import cors from "cors";
const app = express();

const PORT = 3000;
const apiKey = "fristroop.com";
const data = {
  id: 1,
  username: "Fristroop",
  password: "mypassword123",
  avatar: "https://avatars.githubusercontent.com/u/148715312?s=200&v=4",
};

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const Route = "/api/@me";

app.all(Route, (req, res) => {
  if (req.headers.authorization !== apiKey)
    return res.status(403).send("Invalid API Key");

  (data.reqBody = req.body), (data.reqQuery = req.query);
  res.send(data);
});

app.listen(PORT, () =>
  console.log(`Example API server is running at http://localhost:3000`)
);
