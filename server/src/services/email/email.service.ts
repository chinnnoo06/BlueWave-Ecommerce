
import nodemailer from "nodemailer"
import { BACKEND_URL, GMAIL_APP_PASSWORD, GMAIL_USER } from "../../config/env";
import { TContact } from "../../types/communication";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD, 
  },
})

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `${BACKEND_URL}/api/user/verify-account?token=${token}`;

  await transporter.sendMail({
    from: `"BlueWave | Eleva tu experiencia de audio" <${GMAIL_USER}>`,
    to: email,
    subject: "Verifica tu cuenta",
    html: `
      <h2>Bienvenido a BlueWave</h2>
      <p>Haz click en el botón para verificar tu cuenta:</p>

      <a href="${verifyUrl}"
         style="display:inline-block;padding:10px 20px;
         background:#001F3F;color:white;text-decoration:none;
         border-radius:5px;">
         Verificar cuenta
      </a>

      <p>Si no creaste esta cuenta, ignora este correo.</p>
    `,
  })
};


export const sendCodeToRecoverPasswordEmail = async (email: string, code: string) => {
  await transporter.sendMail({
    from: `"BlueWave | Eleva tu experiencia de audio" <${GMAIL_USER}>`,
    to: email,
    subject: "Código para restablecer contraseña",
    html: `
      <p>
        Has solicitado restablecer tu contraseña.
        Usa el siguiente código para continuar con el proceso:
      </p>

      <h2 style="letter-spacing:2px;">${code}</h2>

      <p>Este código expira en 15 minutos.</p>
      <p>Si no solicitaste esto, ignora este mensaje.</p>
    `,
  })
};

export const sendWelcomeSubscriberEmail = async (email: string) => {
  const removeUrl = `${BACKEND_URL}/api/subscriber/redirect-remove/${encodeURIComponent(email)}`;

  await transporter.sendMail({
    from: `"BlueWave | Eleva tu experiencia de audio" <${GMAIL_USER}>`,
    to: email,
    subject: "¡Gracias por suscribirte a BlueWave!",
    html: `
      <div style="font-family: Arial, sans-serif; color: #001F3F; line-height: 1.5;">
        <h2 style="color: #0C71E4;">¡Bienvenido a BlueWave!</h2>
        <p>
          Gracias por unirte a nuestra comunidad. A partir de ahora, recibirás nuestras últimas noticias, ofertas especiales,
          productos exclusivos y contenido especialmente diseñado para nuestros suscriptores.
        </p>
        <p>
          Mientras tanto, te invitamos a visitar nuestro sitio y descubrir todo lo que BlueWave tiene para ofrecer.
        </p>
        <a href="http://localhost:5173/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0C71E4; color: white; text-decoration: none; border-radius: 6px;">
          Visita BlueWave
        </a>
        <p style="margin-top: 20px; font-size: 0.85rem; color: #555;">
          Si no deseas recibir estos correos, puedes <a href="${removeUrl}" style="color: #0C71E4;">darte de baja aquí</a>.
        </p>
      </div>
    `,
  });
};

export const sendContactEmail = async (data: TContact) => {

  await transporter.sendMail({
    from: `"BlueWave | Contacto" <${GMAIL_USER}>`,
    to: GMAIL_USER, // TU correo
    replyTo: data.email, // 👈 clave: responder al usuario
    subject: `📩 Nuevo mensaje de contacto: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #001F3F; line-height: 1.6;">
        <h2 style="color: #0C71E4;">Nuevo mensaje desde el formulario de contacto</h2>

        <p><strong>Nombre:</strong> ${data.name} ${data.surname}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        <p><strong>Asunto:</strong> ${data.subject}</p>

        <hr />

        <p style="white-space: pre-line;">
          ${data.message}
        </p>

        <hr />

        <p style="font-size: 0.85rem; color: #555;">
          Puedes responder directamente a este correo para contestar al usuario.
        </p>
      </div>
    `,
  })
};