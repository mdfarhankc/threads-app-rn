import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators.js";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SECRET_KEY: str(),
});