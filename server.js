const express = require('express');
const app = express();

const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(expressValidator())


let todos = [];
const finished =[];

app.get("/", function (req, res) {
  res.render('home', { todos: todos, finished: finished });
});

app.post("/", function (req, res) {


    if(req.body.newName === "newValue"){

      req
      .checkBody("newTodo", "You must give a valid item")
      .notEmpty();

      const errors = req.validationErrors()
      if(errors){

      }else{
        todos.push(req.body.newTodo);
      }
    }else {
      for (var i = 0; i < todos.length; i++) {
        if (req.body.newName === todos[i]) {
          finished.push(todos[i]);
          function removeTodo(element){
            return element != todos[i]
          }
          todos = todos.filter(removeTodo)
        }
      }
    }
      res.redirect('/');

})


app.listen(3000, () => {
  console.log("Magic is happening on port 3000");
});
