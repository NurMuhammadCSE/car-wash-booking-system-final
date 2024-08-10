import express from "express";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";


const app = express();

app.use(express.json());

app.get('/', (req, res ) => {
    res.send("Car Washing System")
} )

app.use(globalErrorHandler);

// Not Found Route
app.use(notFound);

export default app;