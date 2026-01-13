import { TUserLogged } from "../../types/user/user.types";

declare global {
    namespace Express {
        interface Request {
            user?: TUserLogged;
            colorCounters?: { [colorIndex: number]: number };
        }
    }
}
export { };
