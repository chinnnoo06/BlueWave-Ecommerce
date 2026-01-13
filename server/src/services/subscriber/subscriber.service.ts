import { subscriberRepository } from "../../repositories/subscriber/subscriber.repository";
import { TSubscriber } from "../../types/communication";
import { sendWelcomeSubscriberEmail } from "../email/email.service";

export const addSubscriberService = async (data: TSubscriber) => {
    const subscriberExist = await subscriberRepository.findByEmail(data.email)

    if (subscriberExist ) throw new Error('Este correo ya esta registrado')

    await subscriberRepository.addSubscriber(data)

    await sendWelcomeSubscriberEmail(data.email)
}

export const removeSubscriberService = async (email: TSubscriber['email']) => {
    await subscriberRepository.removeSubscriber(email)
}