const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const port = 3002

app.use(express.json()) // give access to the req.body

require('dotenv').config()

app.use(cors({
    origin: "http://localhost:5173",
}))

const Schema = mongoose.Schema;
const TodoSchema = new Schema(
    {
        todo: String
    }
)
const Todo = mongoose.model("Todo", TodoSchema)




app.get("/test", (req, res) => {
    console.log("TEST route HIT")
    res.json({ msg: "Test Route Hit" })
})

app.post("/api/create", (req, res) => {
    console.log("api/create", req.body)
    Todo.create(req.body)
        .then(created => {
            console.log("created", created)
            res.json(created)
        })
})

app.get("/api/getTodo", (req, res) => {
    console.log("GET Todo HIT")
    Todo.find()
        .then(found => {
            console.log("found", found)
            res.json(found)
        })
})

app.delete("/api/delete/:id", (req, res) => {
    console.log("Del HIT", req.params.id)

    Todo.findByIdAndDelete(req.params.id)
        .then(deleted => {
            console.log("del", deleted)
            res.json(deleted)
        })
})

app.put("/api/edit/:id", (req, res) => {
    console.log("Edit HIT", req.body, req.params)
    // Todo.findById(req.params.id)
    //     .then(found => {
    //         console.log("found", found)
    //         found.todo = req.body.edit
    //         found.save()
    //         res.json({msg: "edit update"})
    //     })
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true})
        .then(updated => {
            console.log("updated", updated)
            res.json(updated)
        })
})







app.listen(port, () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is live and connected")
        })

    console.log("Server is live on port" + " " + port)
})