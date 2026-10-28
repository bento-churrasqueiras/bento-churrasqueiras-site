// Recebe os formulários do site e cria o lead (contato + card no funil) no Salos.
// A mensagem de WhatsApp sai por uma automação no Salos, disparada pela etiqueta.
// A chave fica na variável SALOS_API_KEY da Vercel; nunca no código (o repo é público).

const SALOS = "https://app.salos.com.br/api/leads";
const FUNIL = "a5739379-d299-4298-bce2-22d63e6ed31b"; // Ativação
const ETAPA = "80a270a7-90bf-4506-94b6-c0d094be8621"; // Entrada

const TIPOS = {
  catalogo: { etiqueta: "6eb4201e-b2b1-4fd8-b47c-f760a918e724", card: "Catálogo" },
  contato: { etiqueta: "7dbbec8e-56fd-4d34-90c8-1d36f08fb5f8", card: "Contato" },
  assistencia: { etiqueta: "5f2bf642-d991-4f09-83b0-439699646b69", card: "Assistência" }
};

const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

function texto(v, max) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

// (54) 99999-9999 → +55 54 99999-9999; aceita número já com 55 na frente
function telefone(v) {
  var d = texto(v, 40).replace(/\D/g, "");
  if (d.length === 12 || d.length === 13) d = d.slice(2);
  if (d.length !== 10 && d.length !== 11) return "";
  return "+55 " + d.slice(0, 2) + " " + d.slice(2, -4) + "-" + d.slice(-4);
}

module.exports = async function (req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  var b = req.body || {};
  var tipo = TIPOS[b.tipo];
  var fone = telefone(b.telefone);
  var email = texto(b.email, 200);
  var ref = texto(b.ref, 100);
  if (!tipo || !fone || !ref) return res.status(400).json({ ok: false, erro: "dados" });

  var nome = texto(b.nome, 120) || "Visitante do site";
  var produto = texto(b.produto, 60);
  var pagina = texto(b.pagina, 200);
  var nota = [
    "Formulário: " + tipo.card + (pagina ? " (" + pagina + ")" : ""),
    produto && "Produto: " + produto,
    texto(b.descricao, 4000)
  ].filter(Boolean).join("\n");

  var corpo = {
    external_ref: "site-" + ref,
    source: "Site",
    tags: [tipo.etiqueta],
    contact: { name: nome, phone: fone },
    deal: {
      name: "Site · " + tipo.card + " — " + nome,
      funnel_id: FUNIL,
      column_id: ETAPA,
      notes: nota
    }
  };
  if (email) corpo.contact.email = email;

  var utm = {};
  UTM.forEach(function (k) { var v = texto((b.utm || {})[k], 200); if (v) utm[k] = v; });
  if (Object.keys(utm).length) corpo.utm = utm;

  try {
    var r = await fetch(SALOS, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + process.env.SALOS_API_KEY },
      body: JSON.stringify(corpo)
    });
    if (!r.ok) {
      console.error("Salos", r.status, await r.text());
      return res.status(502).json({ ok: false });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Salos", e);
    return res.status(502).json({ ok: false });
  }
};
