import userModel from "../user/user-model.js";
import { getHashFromClearText } from "../utils/crypto.js";

export default function addRouteHandlers(app) {
    app.get("/", async (requestAnimationFrame, reply) => {
        return { hello: "world" };
    });
    app.post("/api/users", async(requestAnimationFrame, reply) =>{
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