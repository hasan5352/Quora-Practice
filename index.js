
const express = require("express") ;
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 8080;

app.listen(port, ()=>{
    console.log(`App listening on port = ${port}`);
})

//----------------------------- GET ------------------------------

app.get("/", (req, res)=>{
    res.send(`<h1> Received GET request </h1>`);
})

let posts = [
    {
        id: uuidv4(),
        username: "adam",
        content: `My name is adam` 
    },
]
app.get("/posts", (req, res)=>{                     // index route
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res)=>{                     // create route
    res.render("new.ejs");
})

app.get("/posts/:id", (req, res)=>{                     // show details route
    let id = req.params.id;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
})


//----------------------------- POST ------------------------------

app.post("/posts", (req, res)=>{                     // create post
    let {username, content} = req.body;
    posts.unshift({username, content, id:uuidv4()});
    res.redirect("/posts");
})

//----------------------------- patch ------------------------------

app.patch("/posts/:id", (req, res)=>{                     // create post
    let {username, content} = req.body;
    posts.unshift({username, content, id:uuidv4()});
    res.redirect("/posts");
})

//----------------------------- NONEXISTENT PATH ------------------------------
app.use("*", (req, res)=>{
    res.send(`<h1> Page does not exist </h1>`);
})