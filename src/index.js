export default {
    async fetch(request) {
      if (request.method === "POST") {
        const formData = await request.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone") || "No proporcionado";
        const company = formData.get("company") || "No proporcionado";
        const subject = formData.get("subject");
        const message = formData.get("message");
        const consent = formData.get("consent");
  
        // Validación básica
        if (!name || !email || !subject || !message || !consent) {
          return new Response("Faltan campos obligatorios", { status: 400 });
        }
  
        // Construir cuerpo del correo
        const emailBody = `
          Nuevo mensaje de contacto:
          - Nombre: ${name}
          - Email: ${email}
          - Teléfono: ${phone}
          - Empresa: ${company}
          - Asunto: ${subject}
          - Mensaje: ${message}
        `;
  
        // Enviar a MailChannels
        const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: `${name} <${email}>`,
            to: "info@amazonboost.agency",
            subject: `Formulario: ${subject}`,
            text: emailBody,
          }),
        });
  
        return new Response("¡Mensaje enviado!", { status: 200 });
      }
      return new Response("Método no permitido", { status: 405 });
    },
  };