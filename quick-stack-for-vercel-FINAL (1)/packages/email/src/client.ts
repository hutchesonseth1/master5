import { Resend } from "resend";
import { loadServerEnv } from "@repo/utils/env";

const env = loadServerEnv();
export const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;
