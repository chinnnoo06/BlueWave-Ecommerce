import bcrypt from 'bcrypt'
import crypto from "crypto";
import { createCartService } from "../cart/cart.service";
import { sendCodeToRecoverPasswordEmail, sendVerificationEmail } from "../email/email.service";
import { userRepository } from '../../repositories/user/user.repository';
import { userAuthRepository } from '../../repositories/user/user.auth.repository';
import { TUser } from '../../types/user/user.types';
import { TLogin } from '../../types/params/params.types';
import { generate6DigitCode, HttpError } from '../../helpers';

export const registerUserService = async (data: TUser) => {
    const userExists = await userRepository.findByEmail(data.email)

    if (userExists) throw new HttpError(409, "Ese correo ya está registrado");

    const pwd = await bcrypt.hash(data.password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await userAuthRepository.create({
        ...data,
        password: pwd,
        verificationToken,
        verificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60)
    })

    await createCartService(user._id)

    await sendVerificationEmail(user.email, verificationToken);

    return user
}

export const forwardEmailService = async (email: TUser['email']) => {
    const userExists = await userRepository.findByEmail(email)

    if (!userExists) throw new HttpError(404, "No esta registrada esta cuenta");

    if (userExists.isVerified) throw new HttpError(409, "La cuenta ya fue verificada");

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60)

    await userAuthRepository.setVerificationToken(userExists._id, verificationToken, expires)

    await sendVerificationEmail(userExists.email, verificationToken);
}

export const verifyAccountService = async (token: string) => {

    const userValidToken = await userAuthRepository.userValidateToken(token)

    if (!userValidToken) throw new HttpError(401, "Token invalido o expirado");

    await userAuthRepository.verifyAccount(userValidToken._id)

    return userValidToken._id
}

export const loginService = async (data: TLogin) => {
    const userExists = await userRepository.findByEmail(data.email)

    if (!userExists) throw new HttpError(401, "Usuario o contraseña incorrectos");

    let pwd = bcrypt.compareSync(data.password, userExists.password)

    if (!pwd) throw new HttpError(401, "Usuario o contraseña incorrectos");

    if (!userExists.isVerified) {
        return {
            status: "unverified",
            email: userExists.email
        };
    }

    return {
        status: "success",
        user: userExists
    }
};


export const createCodeToRecoverPasswordService = async (email: TUser['email']) => {
    const userExists = await userRepository.findByEmail(email)

    if (!userExists) throw new HttpError(404, "No esta registrada esta cuenta");

    const verificationCode = generate6DigitCode()
    const hashedCode = await bcrypt.hash(verificationCode, 10);
    const expires = new Date(Date.now() + 1000 * 60 * 15)

    await userAuthRepository.setRecoverPasswordCode(userExists._id, hashedCode, expires)

    await sendCodeToRecoverPasswordEmail(userExists.email, verificationCode);

}


export const validateCodeToRecoverPasswordService = async (email: TUser['email'], code: string) => {
    const userExists = await userRepository.findByEmail(email)

    if (!userExists) throw new HttpError(404, "No esta registrada esta cuenta");

    if (!userExists.verificationCodeExpires || userExists.verificationCodeExpires <= new Date()) throw new Error('El código ha expirado')

    const compareCode = bcrypt.compareSync(code, userExists.codeToRecoverPassword)

    if (!compareCode) throw new HttpError(401, "Código incorrecto");

    await userAuthRepository.cleanRecoverPasswordCode(userExists._id)
}


export const saveNewPasswordService = async (email: TUser['email'], newPassword: TUser['password']) => {
    const userExists = await userRepository.findByEmail(email)

    if (!userExists) throw new HttpError(404, "No esta registrada esta cuenta");

    if (!userExists.canUpdatePassword) throw new HttpError(403, "No autorizado para cambiar la contraseña");

    const verifyPwd = bcrypt.compareSync(newPassword, userExists.password)

    if (verifyPwd) throw new HttpError(400, 'La contraseña nueva no puede ser igual que la anterior')

    const pwd = await bcrypt.hash(newPassword, 10);

    await userAuthRepository.saveNewPassword(userExists._id, pwd)

    return userExists._id
}