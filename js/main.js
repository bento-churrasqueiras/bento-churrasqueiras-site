/* Bento Churrasqueiras — comportamento da home. Sem dependências. */
(function () {
  "use strict";

  /* ---------- Largura da barra de rolagem (usada no cálculo das margens) ---------- */
  function medirBarra() {
    document.documentElement.style.setProperty("--barra", window.innerWidth - document.documentElement.clientWidth + "px");
  }
  medirBarra();
  window.addEventListener("resize", medirBarra);

  /* ---------- Rolagem suave (Lenis) ----------
     Só no mouse/trackpad: no toque a rolagem nativa do celular já é suave.
     Desligada para quem pede menos movimento. */
  var lenis = null;
  if (window.Lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lenis = new window.Lenis({ autoRaf: true, lerp: 0.09, allowNestedScroll: true });
    // menu em overlay e ampliação de fotos rolam por conta própria
    document.querySelectorAll("#menu, [data-lupa-janela]").forEach(function (el) { el.setAttribute("data-lenis-prevent", ""); });
    // links internos (#secao): desliza até o alvo (a Lenis respeita o scroll-margin-top) e leva o foco junto
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a[href^="#"]');
      var alvo = a && a.getAttribute("href").length > 1 && document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
      if (!alvo) return;
      e.preventDefault();
      lenis.scrollTo(alvo);
      history.pushState(null, "", a.getAttribute("href"));
      if (!alvo.hasAttribute("tabindex") && alvo.tabIndex < 0) alvo.setAttribute("tabindex", "-1");
      alvo.focus({ preventScroll: true });
    });
  }
  function rolarAte(y) {
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  /* ---------- Revelação dos títulos (linha a linha) ---------- */
  var titulos = Array.prototype.slice.call(document.querySelectorAll("[data-linhas]"));
  titulos.forEach(function (t) { t.dataset.original = t.innerHTML; });

  // agrupa as palavras por linha visual e embrulha cada linha numa máscara
  function dividirEmLinhas(t) {
    t.innerHTML = t.dataset.original;
    var brs = t.querySelectorAll("br");
    var escondidos = [];
    brs.forEach(function (b) { if (getComputedStyle(b).display === "none") escondidos.push(b); });
    escondidos.forEach(function (b) { b.remove(); });
    var palavras = [];
    Array.prototype.slice.call(t.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { t.insertBefore(document.createTextNode(" "), n); return; }
          var sp = document.createElement("span");
          sp.textContent = p;
          sp.style.display = "inline-block";
          t.insertBefore(sp, n);
          palavras.push(sp);
        });
        t.removeChild(n);
      } else if (n.nodeType === 1 && n.tagName !== "BR") {
        // elementos de destaque (ex.: <em>500</em>) viram uma "palavra" preservando a marcação
        var el = document.createElement("span");
        el.style.display = "inline-block";
        t.insertBefore(el, n);
        el.appendChild(n);
        palavras.push(el);
      }
    });
    var linhas = [];
    var topo = null;
    palavras.forEach(function (p) {
      if (topo === null || Math.abs(p.offsetTop - topo) > 4) { linhas.push([]); topo = p.offsetTop; }
      linhas[linhas.length - 1].push(p.innerHTML);
    });
    t.textContent = "";
    linhas.forEach(function (ws, i) {
      var l = document.createElement("span");
      l.className = "rv-linha";
      var dentro = document.createElement("span");
      dentro.className = "rv-in";
      dentro.style.setProperty("--l", i);
      dentro.innerHTML = ws.join(" "); // conteúdo vem do próprio HTML da página
      l.appendChild(dentro);
      t.appendChild(l);
    });
    t.classList.add("rv-pronto");
  }

  function prepararTitulos() { titulos.forEach(dividirEmLinhas); }

  function revelar(el) {
    el.classList.add("revelado");
    var intro = el.closest(".linhas-intro, .pg-abertura");
    if (intro) intro.classList.add("aceso");
    var hero = el.closest(".hero");
    if (hero) hero.classList.add("revelado");
  }

  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
    prepararTitulos();
    var blocos = document.querySelectorAll("[data-revelar]");
    var obs = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { revelar(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.35 }) : null;
    blocos.forEach(function (b) {
      if (b.dataset.revelar === "carga" || !obs) {
        requestAnimationFrame(function () { requestAnimationFrame(function () { revelar(b); }); });
      } else {
        obs.observe(b);
      }
    });
  });

  // ao mudar a largura, a quebra das linhas muda: refaz a divisão (já revelado)
  var larguraAnterior = window.innerWidth;
  window.addEventListener("resize", function () {
    if (window.innerWidth === larguraAnterior) return;
    larguraAnterior = window.innerWidth;
    clearTimeout(prepararTitulos.t);
    prepararTitulos.t = setTimeout(prepararTitulos, 150);
  });

  /* ---------- Header: painel de Produtos ---------- */
  var topo = document.querySelector("[data-topo]");
  if (topo) {

    topo.querySelectorAll("[data-drop]").forEach(function (b) {
      b.addEventListener("click", function () {
        b.setAttribute("aria-expanded", String(b.getAttribute("aria-expanded") !== "true"));
      });
      b.parentElement.addEventListener("mouseleave", function () { b.setAttribute("aria-expanded", "false"); });
    });
    document.addEventListener("click", function (e) {
      topo.querySelectorAll("[data-drop]").forEach(function (b) {
        if (!b.parentElement.contains(e.target)) b.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") topo.querySelectorAll("[data-drop]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Números: contam de 0 até o valor ao entrar na tela ---------- */
  var numeros = document.querySelector("[data-numeros]");
  // a contagem não desloca nada na tela: vale também para quem pede menos movimento
  if (numeros && "IntersectionObserver" in window) {
    var alvos = numeros.querySelectorAll("[data-contar]");
    alvos.forEach(function (el) { el.textContent = "0"; });
    var obsNum = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      obsNum.disconnect();
      var inicio = performance.now();
      var dur = 1800;
      (function passo(agora) {
        var p = Math.min(1, (agora - inicio) / dur);
        var e = 1 - Math.pow(1 - p, 4);
        alvos.forEach(function (el) { el.textContent = Math.round(e * Number(el.dataset.contar)); });
        if (p < 1) requestAnimationFrame(passo);
      })(inicio);
    }, { threshold: 0.4 });
    obsNum.observe(numeros);
  }

  /* ---------- Menu em overlay (mobile) ---------- */
  var botao = document.querySelector("[data-menu-abrir]");
  var menu = document.getElementById("menu");

  var DURACAO_MENU = 700; // igual à transição do clip-path no CSS

  // ordem de entrada dos itens (usada no atraso da animação)
  if (menu) {
    menu.querySelectorAll(".menu__lista > li, .menu__lado > *").forEach(function (el, i) {
      el.style.setProperty("--i", i);
    });
  }

  function origemDoCirculo() {
    var r = botao.querySelector(".menu-botao__circulo").getBoundingClientRect();
    menu.style.setProperty("--mx", r.left + r.width / 2 + "px");
    menu.style.setProperty("--my", r.top + r.height / 2 + "px");
  }

  function abrirMenu() {
    origemDoCirculo();
    menu.hidden = false;
    menu.offsetHeight; // força o navegador a aplicar o estado inicial antes da transição
    menu.classList.add("aberto");
    botao.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-aberto");
    var primeiro = menu.querySelector("a");
    if (primeiro) primeiro.focus({ preventScroll: true });
  }

  function fecharMenu() {
    origemDoCirculo();
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-aberto");
    setTimeout(function () {
      if (menu.classList.contains("aberto")) return; // reaberto no meio da animação
      menu.hidden = true;
      menu.querySelectorAll("[data-submenu]").forEach(function (g) {
        g.setAttribute("aria-expanded", "false");
        g.nextElementSibling.classList.remove("aberto");
      });
    }, DURACAO_MENU);
    botao.focus();
  }

  if (botao && menu) {
    botao.addEventListener("click", function () {
      botao.getAttribute("aria-expanded") === "true" ? fecharMenu() : abrirMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && botao.getAttribute("aria-expanded") === "true") fecharMenu();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) fecharMenu();
    });

    // Submenu de Produtos: abre/fecha ao clicar
    menu.querySelectorAll("[data-submenu]").forEach(function (gatilho) {
      var caixa = gatilho.nextElementSibling;
      gatilho.addEventListener("click", function () {
        var aberto = gatilho.getAttribute("aria-expanded") === "true";
        gatilho.setAttribute("aria-expanded", String(!aberto));
        caixa.classList.toggle("aberto", !aberto);
      });
    });
  }

  /* ---------- Vitrine das linhas ----------
     Desktop: a seção fica fixa e a linha "ativa" muda conforme o scroll.
     Celular: cada linha fica "ativa" ao entrar na tela. */
  var vitrine = document.querySelector(".linhas");
  if (vitrine) {
    var linhas = Array.prototype.slice.call(vitrine.querySelectorAll(".linha"));
    var indice = vitrine.querySelector(".vitrine-indice");
    var botoesIndice = indice ? indice.querySelectorAll("[data-ir]") : [];
    var desktop = window.matchMedia("(min-width: 901px)");
    vitrine.style.setProperty("--qtd", linhas.length);

    var atualizarVitrine = function () {
      if (!desktop.matches) return;
      var total = vitrine.offsetHeight - window.innerHeight;
      var p = Math.min(1, Math.max(0, -vitrine.getBoundingClientRect().top / total));
      var i = Math.min(linhas.length - 1, Math.floor(p * linhas.length));
      linhas.forEach(function (l, j) { l.classList.toggle("ativa", j === i); });
      botoesIndice.forEach(function (b, j) { b.setAttribute("aria-current", String(j === i)); });
      if (indice) indice.style.setProperty("--progresso", p);
    };
    var irPara = function (i) {
      var topo = vitrine.getBoundingClientRect().top + window.scrollY;
      var passo = (vitrine.offsetHeight - window.innerHeight) / linhas.length;
      rolarAte(topo + passo * i + 2);
    };
    botoesIndice.forEach(function (b) { b.addEventListener("click", function () { irPara(Number(b.dataset.ir)); }); });
    // Tab entrando numa linha escondida: rola até ela
    linhas.forEach(function (l, i) {
      l.addEventListener("focusin", function () { if (desktop.matches && !l.classList.contains("ativa")) irPara(i); });
    });

    var obsLinhas = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("ativa"); obsLinhas.unobserve(e.target); } });
    }, { threshold: 0.15 }) : null;

    var modoVitrine = function () {
      if (obsLinhas) obsLinhas.disconnect();
      linhas.forEach(function (l) { l.classList.remove("ativa"); });
      if (desktop.matches) atualizarVitrine();
      else if (obsLinhas) linhas.forEach(function (l) { obsLinhas.observe(l); });
      else linhas.forEach(function (l) { l.classList.add("ativa"); });
    };
    var agendado = false;
    window.addEventListener("scroll", function () {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(function () { agendado = false; atualizarVitrine(); });
    }, { passive: true });
    window.addEventListener("resize", atualizarVitrine);
    desktop.addEventListener("change", modoVitrine);
    modoVitrine();
  }

  /* ---------- Raio-X: legendas aparecem conforme a rolagem ---------- */
  document.querySelectorAll("[data-raiox]").forEach(function (sec) {
    var partes = [
      sec.querySelectorAll(".raiox__linhas path"),
      sec.querySelectorAll(".raiox__ponto"),
      sec.querySelectorAll(".raiox__rotulo")
    ];
    var total = partes[2].length;
    var desktop = window.matchMedia("(min-width: 901px)");
    var mostrar = function (qtd) {
      partes.forEach(function (lista) {
        Array.prototype.forEach.call(lista, function (el, i) { el.classList.toggle("on", i < qtd); });
      });
    };
    var atualizar = function () {
      if (!desktop.matches) return;
      var r = sec.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, -r.top / (sec.offsetHeight - window.innerHeight)));
      mostrar(Math.min(total, Math.floor(p * (total + 1) + .15)));
    };
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    atualizar();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting && !desktop.matches) mostrar(total);
      }, { threshold: 0.2 }).observe(sec);
    } else { mostrar(total); }
  });

  /* ---------- Carrossel de avaliações (loop infinito) ---------- */
  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-carrossel]").forEach(function (carrossel) {
    if (reduzir) return;
    var trilho = carrossel.querySelector(".avaliacoes__trilho");
    Array.prototype.slice.call(trilho.children).forEach(function (item) {
      var copia = item.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");
      trilho.appendChild(copia);
    });
    // ~40px por segundo, independente da quantidade de avaliações
    trilho.style.setProperty("--duracao", Math.round(trilho.scrollWidth / 2 / 40) + "s");
  });

  /* ---------- WhatsApp flutuante: aparece depois do hero ---------- */
  var flutuante = document.querySelector(".wpp-flutuante");
  // a abertura de cada página: hero da home, abertura de linha ou abertura institucional
  var hero = document.querySelector(".hero, .linha-hero, .pg-abertura");
  if (flutuante && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      flutuante.classList.toggle("visivel", !entradas[0].isIntersecting);
    }, { threshold: 0.15 }).observe(hero);
  }

  /* ---------- Formulários → Salos (api/lead.js cria o card; a automação manda o WhatsApp) ---------- */
  // guarda a campanha de quem chegou por anúncio, para ir junto com o lead
  var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
  try {
    var busca = new URLSearchParams(location.search);
    if (UTM.some(function (k) { return busca.get(k); })) {
      var guardar = {};
      UTM.forEach(function (k) { if (busca.get(k)) guardar[k] = busca.get(k); });
      sessionStorage.setItem("bento-utm", JSON.stringify(guardar));
    }
  } catch (e) { /* sem sessionStorage: segue sem campanha */ }

  function campanha() {
    try { return JSON.parse(sessionStorage.getItem("bento-utm")) || {}; } catch (e) { return {}; }
  }

  function enviarLead(form, tipo, onde) {
    var botao = form.querySelector("button[type=submit]");
    var aviso = onde.querySelector(".aviso") || onde.appendChild(document.createElement("p"));
    aviso.className = "aviso";
    aviso.setAttribute("role", "status");
    var dados = {};
    new FormData(form).forEach(function (v, k) { if (typeof v === "string") dados[k] = v; });
    dados.tipo = tipo;
    dados.telefone = dados.telefone || dados.whatsapp;
    dados.pagina = location.pathname;
    dados.utm = campanha();
    botao.disabled = true;
    aviso.textContent = "Enviando…";
    fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); })
      .then(function () {
        aviso.textContent = form.dataset.sucesso;
        form.reset();
      })
      .catch(function () {
        aviso.innerHTML = 'Não conseguimos enviar agora. Tente de novo ou fale com a gente no <a href="https://app.salos.com.br/l/01409c5b6c3de8aea5466617a9a3b798" target="_blank" rel="noopener">WhatsApp</a>.';
      })
      .then(function () { botao.disabled = false; });
  }

  // campo invisível contra robôs (fora da tela, fora do Tab, sem autocompletar)
  document.querySelectorAll("[data-catalogo], [data-chamado]").forEach(function (form) {
    var isca = document.createElement("input");
    isca.name = "empresa_site";
    isca.tabIndex = -1;
    isca.autocomplete = "off";
    isca.setAttribute("aria-hidden", "true");
    isca.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;opacity:0";
    form.appendChild(isca);
  });

  document.querySelectorAll("[data-catalogo]").forEach(function (form) {
    form.dataset.sucesso = "Pronto! Em instantes o catálogo chega no seu WhatsApp.";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      enviarLead(form, "catalogo", form);
    });
  });

  /* ---------- Contato e Assistência ---------- */
  document.querySelectorAll("[data-chamado]").forEach(function (form) {
    var tipo = form.dataset.chamado || "contato";
    form.dataset.sucesso = {
      assistencia: "Recebemos sua solicitação. Vamos te chamar no WhatsApp; mande as fotos do defeito por lá.",
      arquiteto: "Cadastro feito! Em instantes o link dos blocos 3D chega no seu WhatsApp."
    }[tipo] || "Mensagem recebida! Vamos te responder pelo WhatsApp.";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      enviarLead(form, tipo, form.querySelector(".chamado__envio"));
    });
  });

  /* ---------- Projetos: filtro por família ---------- */
  var mosaico = document.querySelector("[data-mosaico]");
  var filtros = document.querySelector("[data-filtros]");
  if (mosaico && filtros) {
    var itensMosaico = Array.prototype.slice.call(mosaico.children);
    var aviso = document.querySelector("[data-filtro-aviso]");
    filtros.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filtro]");
      if (!b) return;
      var f = b.dataset.filtro, n = 0;
      filtros.querySelectorAll("[data-filtro]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      itensMosaico.forEach(function (li) {
        var mostra = f === "todos" || li.dataset.familia === f;
        li.hidden = !mostra;
        if (mostra) { n++; li.style.animation = "none"; li.offsetHeight; li.style.animation = ""; }
      });
      if (aviso) aviso.textContent = n + " projetos";
    });
  }

  /* ---------- Projetos: ampliação com anterior/próxima (só entre as fotos visíveis) ---------- */
  var janela = document.querySelector("[data-lupa-janela]");
  if (mosaico && janela && typeof janela.showModal === "function") {
    var lupaImg = janela.querySelector("[data-lupa-img]");
    var atual = 0, visiveis = [];
    var mostrar = function (i) {
      atual = (i + visiveis.length) % visiveis.length;
      var li = visiveis[atual], img = li.querySelector("img");
      lupaImg.src = img.currentSrc || img.src;
      lupaImg.alt = img.alt;
      janela.querySelector("[data-lupa-titulo]").textContent = li.querySelector(".mosaico__legenda strong").textContent;
      var texto = li.querySelector(".mosaico__legenda span");
      janela.querySelector("[data-lupa-texto]").textContent = texto ? texto.textContent : "";
      janela.querySelector("[data-lupa-conta]").textContent = (atual + 1) + " / " + visiveis.length;
    };
    var gatilho = null;
    mosaico.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lupa]");
      if (!b) return;
      gatilho = b;
      visiveis = Array.prototype.slice.call(mosaico.children).filter(function (li) { return !li.hidden; });
      mostrar(visiveis.indexOf(b.parentElement));
      janela.showModal();
    });
    janela.querySelector("[data-lupa-ant]").addEventListener("click", function () { mostrar(atual - 1); });
    janela.querySelector("[data-lupa-prox]").addEventListener("click", function () { mostrar(atual + 1); });
    janela.querySelector("[data-lupa-fechar]").addEventListener("click", function () { janela.close(); });
    janela.addEventListener("click", function (e) { if (e.target === janela) janela.close(); });
    janela.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") mostrar(atual - 1);
      if (e.key === "ArrowRight") mostrar(atual + 1);
    });
    janela.addEventListener("close", function () { if (gatilho) gatilho.focus(); });
    // deslizar no celular
    var x0 = null;
    janela.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    janela.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- Selo "Modelo patenteado" preso a um ponto da foto de fundo ----------
     data-ancora="x y" = frações da foto; data-foto="largura altura" = tamanho original.
     Refaz a conta do background-size: cover + background-position do elemento pai.
     Com [data-selo-celular] na página, abaixo de 901px o selo vai para o lado do título
     (no celular o canto da churrasqueira fica fora do corte da foto). */
  document.querySelectorAll(".selo-patente[data-ancora]").forEach(function (selo) {
    var foto = selo.parentElement;
    var a = selo.dataset.ancora.split(" ").map(Number);
    var d = selo.dataset.foto.split(" ").map(Number);
    var celular = document.querySelector("[data-selo-celular]");
    var mq = window.matchMedia("(max-width: 900px)");
    function pct(v, livre) { return /%$/.test(v) ? parseFloat(v) / 100 * livre : parseFloat(v) || 0; }
    function posicionar() {
      if (celular && mq.matches) {
        if (selo.parentElement !== celular) { celular.appendChild(selo); selo.classList.remove("selo-patente--foto"); selo.style.left = selo.style.top = ""; }
        return;
      }
      if (selo.parentElement !== foto) { foto.appendChild(selo); selo.classList.add("selo-patente--foto"); }
      var w = foto.clientWidth, h = foto.clientHeight;
      var k = Math.max(w / d[0], h / d[1]);
      var lw = d[0] * k, lh = d[1] * k;
      var cs = getComputedStyle(foto);
      var x = pct(cs.backgroundPositionX, w - lw), y = pct(cs.backgroundPositionY, h - lh);
      // nunca deixa o selo sair da foto (em telas estreitas o canto pode ficar no limite)
      var meio = selo.offsetWidth / 2 + 10;
      selo.style.left = Math.min(Math.max(x + a[0] * lw, meio), w - meio).toFixed(1) + "px";
      selo.style.top = (y + a[1] * lh).toFixed(1) + "px";
    }
    posicionar();
    if (window.ResizeObserver) new ResizeObserver(posicionar).observe(foto);
    else window.addEventListener("resize", posicionar);
    mq.addEventListener("change", posicionar);
  });

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-ano]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
