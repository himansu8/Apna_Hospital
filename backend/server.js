import express from 'express'
import cors from 'cors'
import patientRoute from './routes/patient_routes.js'
import './dbConnect.js';
import receptionRoutes from "./routes/receptionist_routes.js"
import doctorRoutes from "./routes/doctor_routes.js"
import deanRoutes from "./routes/dean_routes.js"
import messageRoutes from "./routes/message_routes.js"
import cookieParser from 'cookie-parser';


const app = express();
const port = 3001;
// const corsOptions = {
//     origin: 'http://localhost:3000', // Replace with your frontend's origin
//     credentials: true, // Allow credentials
//   };
//   app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send("server started up fine")
})
app.use('/api/patient',patientRoute)
app.use('/api/receptionist', receptionRoutes )
app.use('/api/doctor', doctorRoutes)
app.use('/api/dean', deanRoutes)
app.use('/api/message', messageRoutes)

app.listen(port,()=>{
    console.log(`the server started at port no ${port}`)
})

