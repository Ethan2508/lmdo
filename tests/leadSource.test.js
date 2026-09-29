import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyLeadSource, sanitizeLeadSource } from "../api/_leadSource.js";

test("classifyLeadSource", () => {
  const cases = [
    [{ gclid: "test123" }, "Google Ads"],
    [{ gbraid: "x", referrer: "https://www.google.fr/" }, "Google Ads"],
    [{ wbraid: "x" }, "Google Ads"],
    [{ utm_source: "facebook", utm_medium: "CPC" }, "Payant (facebook)"],
    [{ utm_source: "meta", utm_medium: "paid" }, "Payant (meta)"],
    [{ utm_source: "newsletter", utm_medium: "email" }, "Campagne (newsletter / email)"],
    [{ utm_campaign: "noel" }, "Campagne (non précisé / non précisé)"],
    [{ referrer: "https://www.google.fr/" }, "Référencement naturel"],
    [{ referrer: "https://www.bing.com/search?q=or" }, "Référencement naturel"],
    [{ referrer: "https://duckduckgo.com/" }, "Référencement naturel"],
    [{ referrer: "https://www.ecosia.org/" }, "Référencement naturel"],
    [{ referrer: "https://fr.search.yahoo.com/" }, "Référencement naturel"],
    [{ referrer: "https://chatgpt.com/" }, "Assistant IA"],
    [{ referrer: "https://gemini.google.com/app" }, "Assistant IA"],
    [{ referrer: "https://www.perplexity.ai/" }, "Assistant IA"],
    [{ referrer: "https://copilot.microsoft.com/" }, "Assistant IA"],
    [{ referrer: "https://claude.ai/" }, "Assistant IA"],
    [{ referrer: "https://www.pagesjaunes.fr/annuaire" }, "Site référent (pagesjaunes.fr)"],
    [{ referrer: "pas une url" }, "Site référent (inconnu)"],
    [{ landing_page: "/" }, "Direct / inconnu"],
    [{}, "Direct / inconnu"],
    [undefined, "Direct / inconnu"],
  ];
  for (const [source, expected] of cases) {
    assert.equal(classifyLeadSource(source), expected, JSON.stringify(source));
  }
});

test("sanitizeLeadSource", () => {
  assert.deepEqual(sanitizeLeadSource(undefined), {});
  assert.deepEqual(sanitizeLeadSource("gclid=abc"), {});
  assert.deepEqual(sanitizeLeadSource([1, 2]), {});
  assert.deepEqual(
    sanitizeLeadSource({ gclid: " abc ", utm_source: 42, referrer: "", nom: "Dupont", landing_page: "/x" }),
    { gclid: "abc", landing_page: "/x" }
  );
  assert.equal(sanitizeLeadSource({ referrer: "a".repeat(1000) }).referrer.length, 300);
});
