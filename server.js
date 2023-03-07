const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const app = express();

const mongoUri =
  "mongodb+srv://rita78:20mJ646IhRL9VH0L@cluster0.1kgwwjf.mongodb.net/myApp?retryWrites=true&w=majority";

mongoose.connect(mongoUri).then(console.log("DB conection successful!"));
app.use(bodyParser.json());
app.use(express.json());

// /////Book Schema/////
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book must have a title"],
  },
  author: String,
  year: Number,
  avail: {
    type: Boolean,
    default: true,
  },
});

// ////Book Model////
const Book = mongoose.model("Book", bookSchema);

//////POST/////
app.post("/api/books", (req, res) => {
  Book
    .create(req.body)
    .then((doc) => {
      // console.log(doc);
      res.status(201).json(doc);
    })
    .catch((err) => res.status(404).json(err));
});

//GET All (Be filtro)/////
// app.get("/api/books", (req, res) => {
//   Book.find()
//     .then((doc) => {
//       res.status(200).json(doc);
//     })
//     .catch((err) => res.status(404).json(err));
// });

///Get BY SEARCH PARAMS (Filtering)///////
app.get("/api/books", (req, res) => {
  console.log(req.query);
  Book.find(req.query)
    .then((doc) => {
      console.log(req.query);
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
});

/////GET BY ID//////
app.get("/api/books/:id", (req, res) => {
  // console.log(req.params);
  let { id } = req.params;
  Book.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
});

//////DELETE////
app.delete("/api/books/:id", (req, res) => {
  let { id } = req.params;
  Book.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
});

//////UPDATE su PATCH/////
app.patch('/api/books/:id', (req, res)=>{
  let { id } = req.params;
  // query option {new: true} reikalingas, kad vartotojui būtų grąžintas atnaujintas dokumentas t.y. book ir runValidators:true, kad atnaujinanat būtų validuojama pagal schemą

Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
  .then((doc)=>{
    res.status(200).json(doc)
  })
  .catch((err)=>res.status(404).json(err))
})

//////UPDATE su PUT/////
// app.put('/api/books/:id', (req, res)=>{
//   let { id } = req.params;
//   // query option {new: true} reikalingas, kad vartotojui būtų grąžintas atnaujintas dokumentas t.y. book ir runValidators:true, kad atnaujinanat būtų validuojama pagal schema
// Book.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true
//   })
//   .then((doc)=>{
//     res.status(200).json(doc)
//   })
//   .catch((err)=>res.status(404).json(err))
// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port} and listening requests`);
});

//rita78
//20mJ646IhRL9VH0L
