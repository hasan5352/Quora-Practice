
const express = require("express") ;
const app = express();
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.listen(port, ()=>{
    console.log(`App listening on port = ${port}`);
})