// /api/contact.js — Vercel serverless function
// Reçoit les soumissions de formulaire et envoie un mail via Resend.

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Tant que le domaine n'est pas vérifié dans Resend, on tombe sur l'expéditeur
// par défaut "onboarding@resend.dev" (limité aux mails de test).
const MAIL_FROM =
  process.env.MAIL_FROM || "La Maison de l'Or <onboarding@resend.dev>";
const MAIL_TO = process.env.MAIL_TO || "contactreservations.lmdo@gmail.com";

// Échappe les valeurs avant de les insérer dans le HTML.
function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const {
      type = "contact",
      nom = "",
      email = "",
      telephone = "",
      message = "",
      adresse = "",
      codePostal = "",
      ville = "",
      objetType = "",
      poids = "",
      // honeypot anti-bot : si rempli, on ignore silencieusement
      website = "",
    } = body;

    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!nom || !email) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    const isKit = type === "kit-envoi";
    const subject = isKit
      ? `Demande de kit d'envoi — ${nom}`
      : `Nouveau contact site — ${nom}`;

    const rows = [
      ["Type de demande", isKit ? "Kit d'envoi" : "Contact"],
      ["Nom", nom],
      ["Email", email],
      ["Téléphone", telephone],
      ...(isKit
        ? [
            ["Adresse", adresse],
            ["Code postal", codePostal],
            ["Ville", ville],
            ["Type d'objet", objetType],
            ["Poids estimé", poids],
          ]
        : []),
      ["Message", message],
    ].filter(([, v]) => v && String(v).trim() !== "");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#fafafa;border-radius:8px;">
        <h2 style="color:#af7e2f;border-bottom:2px solid #c9973d;padding-bottom:8px;">
          ${esc(subject)}
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:8px 12px;background:#fff;border:1px solid #eee;font-weight:600;width:35%;">${esc(
                k
              )}</td>
              <td style="padding:8px 12px;background:#fff;border:1px solid #eee;white-space:pre-wrap;">${esc(
                v
              )}</td>
            </tr>`
            )
            .join("")}
        </table>
        <p style="margin-top:24px;color:#666;font-size:12px;">
          Envoyé depuis le site La Maison de l'Or — répondez directement à ce mail
          pour contacter ${esc(nom)}.
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Envoi impossible" });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("contact handler error:", e);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
