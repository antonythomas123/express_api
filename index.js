const express = require("express");
const app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    name: "Antony",
    age: 22,
    married: false,
  },
  {
    id: 2,
    name: "Thomas",
    age: 44,
    married: true,
  },
  {
    id: 3,
    name: "Aneesiya",
    age: 18,
    married: false,
  },
  {
    id: 4,
    name: "Sheeja",
    age: 35,
    married: true,
  },
];

app.get("/", (req, res) => {
  res.json(users);
});
app.post("/users", (req, res) => {
  const newUSer = req.body;
  users.push(newUSer);
  res.json(users);
});
app.put("/users", (req, res) => {
  const userName = req.body;
  users.map((user, key) => {
    user.name = userName;
  });
  res.json(users);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
      break;
    }
  }
  res.json(users);
});

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
