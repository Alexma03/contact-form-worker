import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [{ name: "AmazonBoost Agency", email: "info@amazonboost.agency" }],
    },
  ],
  from: { name: "Web Contact", email: "no-reply@amazonboost.agency" },
  respondWith: ({ formData }) => {
    // Validation
    if (!formData.get("name") || 
        !formData.get("email") || 
        !formData.get("subject") || 
        !formData.get("message") || 
        !formData.get("consent")) {
      return new Response("Faltan campos obligatorios", { status: 400 });
    }

    // Successful response with redirect
    return new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    });
  },
  content: async ({ formData }) => ({
    subject: `Formulario: ${formData.get("subject")}`,
    text: `Nuevo mensaje de contacto:
      - Nombre: ${formData.get("name")}
      - Email: ${formData.get("email")}
      - Teléfono: ${formData.get("phone") || "No proporcionado"}
      - Empresa: ${formData.get("company") || "No proporcionado"}
      - Mensaje: ${formData.get("message")}`
  })
});