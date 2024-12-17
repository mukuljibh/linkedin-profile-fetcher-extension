import mongoose from "mongoose";

export default function makeDbConnection(app) {
    mongoose
        .connect(process.env.CONNECTION_STRING)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`server Started runing on port ${process.env.PORT}`)
            })
        })
        .catch((err) => {
            console.log(err)
            console.log(`Database unreachable`);
        });
}
