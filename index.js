const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pcmzmoz.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors())
app.use(express.json())

async function run() {
    try {
        await client.connect();

        const StudentCollection = client.db('StudentManagement').collection('AddStudent')
        const UpdateStudentCollection = client.db('StudentManagement').collection('AddStudent')

        // Add Student (Post API)
        app.post('/addStudent', async (req, res) => {
            const addStudent = req.body
            console.log('add', addStudent)
            const result = await StudentCollection.insertOne(addStudent)
            res.send(result)
        })

        // Get Student
        app.get('/addStudent', async (req, res) => {
            const query = {}
            const cursor = StudentCollection.find(query)
            const student = await cursor.toArray()
            res.send(student)
        })

        // Update Student
        app.put("/updateStudent/:id", async (req, res) => {
            const id = req.params.id;
            const EditStudent = req.body;
            const {  firstName,
                middleName,
                lastName,
                className,
                division,
                rollNumber,
                addressLine1,
                addressLine2,
                landMark,
                city,
                pinCode } = EditStudent;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    firstName,
                    middleName,
                    lastName,
                    className,
                    division,
                    rollNumber,
                    addressLine1,
                    addressLine2,
                    landMark,
                    city,
                    pinCode
                },
            };
            const result = await UpdateStudentCollection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.send(result);
        });

        // Delete Student
        app.delete("/deleteStudent/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await UpdateStudentCollection.deleteOne(query);
            res.send(result);
        });


    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Student Management Server')
})

app.listen(port, () => {
    console.log(`Student Management listening on port ${port}`)
})