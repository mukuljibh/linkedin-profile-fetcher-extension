import { userDetails } from "../model/model.js";
export default function fetchDataController(req, res) {
    userDetails.find({})
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.send("something went wrong")
        });
}