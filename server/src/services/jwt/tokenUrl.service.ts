import jwt from "jsonwebtoken";
import { TUserLogged } from "../../types/user/user.types";
import { SECRET_KEY } from "../../config/env";

export const successToken = (id: TUserLogged['_id']) => {

    const token = jwt.sign(
        {
            userId: id,
            type: "email-verified"
        },
        SECRET_KEY!,
        { expiresIn: "2m" }
    );
    return token
}