export default {
  async fetch(request) {
    if (request.method === "POST") {
      const formData = await request.formData();
      
      // Existing validation logic
      if (!formData.get("name") || 
          !formData.get("email") || 
          !formData.get("subject") || 
          !formData.get("message") || 
          !formData.get("consent")) {
        return new Response("Faltan campos obligatorios", { status: 400 });
      }

      // Match the MailChannels API structure
      const emailContent = `Nuevo mensaje de contacto:
        - Nombre: ${formData.get("name")}
        - Email: ${formData.get("email")}
        - Teléfono: ${formData.get("phone") || "No proporcionado"}
        - Empresa: ${formData.get("company") || "No proporcionado"}
        - Mensaje: ${formData.get("message")}`;

      // Create request matching the example structure
      const mcRequest = new Request('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: "info@amazonboost.agency", name: "AmazonBoost Agency" }],
          }],
          from: {
            email: email,
            name: name
          },
          subject: `Formulario: ${formData.get("subject")}`,
          content: [{
            type: "text/plain",
            value: emailContent
          }],
        }),
      });

      // Send request and handle response
      const response = await fetch(mcRequest);
      
      // Maintain redirect behavior
      return new Response(null, {
        status: 302,
        headers: { Location: "/thank-you" },
      });
    }
    return new Response("Método no permitido", { status: 405 });
  },
};