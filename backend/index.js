const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sagarpuppala123:sagar123@cluster0.8xo5z2y.mongodb.net/xyz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new EmployeeModel({ username, email, password });
    newUser.save()
        .then(() => res.status(201).json("User registered successfully"))
        .catch(err => res.status(500).json("Error: " + err));
});

app.post('/', (req, res) => {
    const { username, password } = req.body;
    EmployeeModel.findOne({ username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record found");
            }
        })
        .catch(err => res.status(500).json("Error: " + err));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

