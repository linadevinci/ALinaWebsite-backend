import userModel from "../user/user-model";
import { getHashFromClearText } from "../utils/crypto";

export default function addRouteHandlers(app) {
    app.get("/", async (requestAnimationFrame, reply) => {
        return { hemmp: "world" };
    });
    app.post("/signup", async(requestAnimationFrame, reply) =>{
        const{email, password, username} = request.body;
        const user = new userModel({
            email, 
            password:getHashFromClearText(password), 
            username
        });
        await user.save();
        return user.toJSON();
    });
}