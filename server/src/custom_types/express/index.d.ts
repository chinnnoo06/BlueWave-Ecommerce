import { TPayloadToken } from "../../services/jwt/token.service";

declare global {
    namespace Express {
        interface Request {
            user?: TPayloadToken;
            colorCounters?: { [colorIndex: number]: number };
        }
    }
}
export { };
