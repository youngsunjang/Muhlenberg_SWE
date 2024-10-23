var express = require('express');
var app = express();

// // SQL Style
// ///////////////////////////////////////////////////////////////////
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('sql_database.sqlite');
// db.run(`
//   CREATE TABLE sql_database (
//     contents VARCHAR(255) not null,
//     primary key(contents)
//   );
//   `
// )
// ///////////////////////////////////////////////////////////////////

// ORM Style
/////////////////////////////////////////////////////////////////////
const { Sequelize, DataTypes } = require('sequelize');
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Comments = sequelize.define(
  'Comments',
  {
    // Model attributes are defined here
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    // Other model options go here
  },
);
/////////////////////////////////////////////////////////////////////

async function asyncFunction () {
  await Comments.sync(); // Refreshing existing table 
  console.log('The table for the Comments model was just (re)created!');
}
asyncFunction();

// let comments = []

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', async function(req, res) {
  const comments = await Comments.findAll();
  // console.log(comments[0].contents)
  res.render('dbfront', {comments: comments});
});

app.get('/comment', function(req, res) {
  console.log(req.query)
  res.send('get method')
});

app.post('/comment', async function(req, res) {
  // console.log(req.body)
  const comment = req.body.comment
  // comments.push(comment)
  // Create a new Comments
  const ID = await Comments.create({ contents: comment});
  console.log("Auto-generated ID:", ID.id);
  
  // console.log(comments)
  // res.send('post method')
  res.redirect('/')
});

app.listen(3000);
console.log('Server is listening on port 3000');





 
