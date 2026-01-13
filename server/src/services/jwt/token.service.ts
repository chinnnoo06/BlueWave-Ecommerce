import jwt from 'jwt-simple'
import moment from 'moment';
import { TUserLogged } from '../../types/user/user.types';
import { SECRET_KEY } from '../../config/env';

export const createToken = (user: TUserLogged) => {
    const payload = {
        _id: user._id,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix()
    }

    return jwt.encode(payload, SECRET_KEY);
}

