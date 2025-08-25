import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
.then(() => {
    const server = app.listen(process.env.PORT, () => {
        console.log(`Server running on PORT ${process.env.PORT}`)
    })

    server.on("error", (err) => {
        console.log(`Server error: ${err}`);
    })
})
.catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
});