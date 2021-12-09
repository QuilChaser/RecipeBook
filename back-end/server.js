const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/recipes', {
  useNewUrlParser: true
});


// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for recipes in the recipeBook: a title and a path to an image.
const recipeSchema = new mongoose.Schema({
  title: String,
  ingred: String,
  instr: String,
  path: String,
});

// Create a model for recipes in the recipeBook.
const Recipes = mongoose.model('Recipes', recipeSchema);

// Create a scheme for recipes in the recipeBook: a title and a path to an image.
const reviewSchema = new mongoose.Schema({
  name: String,
  recipe: String,
  review: String,
});

// Create a model for recipes in the recipeBook.
const Reviews = mongoose.model('Reviews', reviewSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new recipe in the recipeBook: takes a title and a path to an image.
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipes({
    title: req.body.title,
    ingred: req.body.ingred,
    instr: req.body.instr,
    path: req.body.path,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new recipe in the recipeBook: takes a title and a path to an image.
app.post('/api/reviews', async (req, res) => {
  const review = new Reviews({
    name: req.body.name,
    recipe: req.body.recipe,
    review: req.body.review,
  });
  try {
    await review.save();
    res.send(review);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the recipes in the recipeBook.
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipes.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the recipes in the recipeBook.
app.get('/api/reviews', async (req, res) => {
  try {
    let reviews = await Reviews.find();
    res.send(reviews);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    await Reviews.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipes.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/recipes/:id', async (req, res) => {
  try {
    recipe = await Recipes.findOne({
      _id: req.params.id
    });
    recipe.title = req.body.title,
    recipe.ingred = req.body.ingred,
    recipe.instr = req.body.instr,
    recipe.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));
