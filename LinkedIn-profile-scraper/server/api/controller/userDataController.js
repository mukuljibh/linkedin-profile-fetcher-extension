import { userDetails } from "../model/model.js";
import { fetchData } from "../utils/fetchData.js";
export default async function userDataController(req, res) {
    try {
        const link = req.query.id;

        if (!link) {
            return res.status(400).json({ message: "Provide a valid url" })
        }
        const userData = await fetchData(link)
        await userDetails.create(userData)
        res.status(201).json({ message: "successfully inserted" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }

}