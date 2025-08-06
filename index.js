const { initialiseDatabase } = require("./db/db.connect");
const express = require("express");
const cors = require("cors")
const Event = require("./models/events.model")
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.use(express.json());

initialiseDatabase();


app.get("/",(req,res)=>{
    res.send("BI Assignment Backend")
})


async function createNewEvent(newEvent) {
    try{
        const event = new Event(newEvent);
        const savedEvent = await event.save();
        return savedEvent;
    }catch(err){
        throw(err);
    }
}

app.post("/events",async(req,res)=>{
    try{
        const events = await createNewEvent(req.body);
        if(events){
            res.status(200).json({message:"Event successfully added.",event:events});
        }else{
            res.status(404).json({error:"No event found"})
        }
    }catch(err){    
        res.status(500).json({error:"Failed to fetch events"})
    }
})

async function readAllEvents() {
    try{
        const events = await Event.find();
        return events;
    }catch(err){
        throw(err)
    }
}

app.get("/events",async(req,res)=>{
    try{
        const events = await readAllEvents();
        if(events.length!=0){
            res.json(events);
        }else{
            res.status(404).json({error:"No Events found."})
        }
    }catch(err){
        res.status(500).json({error:"Failed to fetch events"})
    }
})

async function readEventById(eventId) {
    try{
        const eventByTitle = await Event.findById({_id:eventId})
        return eventByTitle;
    }catch(err){
        throw(err);
    }
}

app.get("/events/:eventId",async(req,res)=>{
    try{
        const events = await readEventById(req.params.eventId);
        if(events){
            res.json(events)
        }else{
            res.status(404).json({error:"No event found."})
        }
    }catch(err){
        res.status(500).json({error:"Failed to fetch events"})
    }
})

const PORT = 3000;
app.listen(PORT, () => console.log("Server is running on", PORT));
