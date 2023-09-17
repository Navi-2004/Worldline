const express=require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const ejs=require("ejs")
app.set('view engine', 'ejs');
app.set("views", __dirname);

app.use(bodyParser.urlencoded({extended:true}));

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://navi:E2ISsvSLzJ1EXKNE@cluster0.fdvsej2.mongodb.net/worldline",{useNewUrlParser:true},)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const dreamSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    dream:String,
})
const Dream=mongoose.model("Dream",dreamSchema);


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.get("/display", async (req, res) => {
    try {
      // Fetch all documents from the "Dream" collection
      const dreams = await Dream.find();
  
      // Render the "display.html" template with the retrieved data
      res.render("display", { dreams });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the data.");
    }
  });

app.post("/",(req,res)=>{
    const dream=new Dream({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        dream:req.body.dream,
    })
    dream.save();
    console.log(dream);
    console.log("Data Saved");
    res.redirect("/display");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})