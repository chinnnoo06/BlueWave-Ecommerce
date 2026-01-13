import z from "zod";
import type { SubscriberSchema } from "../schemas/subscriber.schema";

export type TSubscriber = z.infer<typeof SubscriberSchema>;