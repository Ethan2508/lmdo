// /api/contact.js — Vercel serverless function
// Reçoit les soumissions de formulaire et envoie un mail via Resend.

import { Resend } from "resend";
import { classifyLeadSource, sanitizeLeadSource } from "./_leadSource.js";

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

function formatVisitDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
}

// Bloc discret en bas de mail : détail brut de la source.
function sourceDetailsHtml(source) {
  const gclid = source.gclid || source.gbraid || source.wbraid;
  const details = [
    ["Identifiant Google Ads", gclid && (gclid.length > 16 ? `${gclid.slice(0, 16)}…` : gclid)],
    ["utm_source", source.utm_source],
    ["utm_medium", source.utm_medium],
    ["utm_campaign", source.utm_campaign],
    ["utm_term", source.utm_term],
    ["Référent", source.referrer],
    ["Page d'arrivée", source.landing_page],
    ["Date de première visite", source.timestamp && formatVisitDate(source.timestamp)],
  ].filter(([, v]) => v);

  if (details.length === 0) return "";
  return `
        <div style="margin-top:24px;padding-top:12px;border-top:1px solid #e5e5e5;color:#999;font-size:11px;line-height:1.6;">
          ${details.map(([k, v]) => `${esc(k)} : ${esc(v)}`).join("<br />")}
        </div>`;
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
    // Champs de suivi optionnels : jamais bloquants.
    const leadSource = sanitizeLeadSource(body.lead_source);
    const sourceLabel = classifyLeadSource(leadSource);

    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!nom || !email) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    if (!process.env.RESEND_API_KEY) {
      return res
        .status(500)
        .json({ error: "RESEND_API_KEY manquante côté serveur" });
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
        <p style="margin:0 0 16px;padding:10px 14px;background:#fff7e6;border-left:4px solid #c9973d;font-size:15px;font-weight:700;color:#333;">
          Source : ${esc(sourceLabel)}
        </p>
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
        </p>${sourceDetailsHtml(leadSource)}
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({
        error: "Envoi impossible",
        detail: error.message || error.name || JSON.stringify(error),
      });
    }

    return res.status(200).json({ ok: true, id: data?.id, source: sourceLabel });
  } catch (e) {
    console.error("contact handler error:", e);
    return res
      .status(500)
      .json({ error: "Erreur serveur", detail: e?.message || String(e) });
  }
}
