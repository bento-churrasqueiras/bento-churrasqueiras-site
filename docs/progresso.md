# Progresso

## 25/09/2026
- Pente-fino do site atual (65 URLs, desktop + mobile, performance, SEO, acessibilidade, segurança) → consolidado em `docs/briefing.md`.
- Protótipo de estilo aprovado pelo cliente salvo em `referencias/prototipo-home-aprovado.png`.
- Briefing do novo site escrito (diagnóstico, o que manter, sistema visual, mapa de páginas, plano código → Elementor).
- Repositório `Salos-Projects/bento-churrasqueiras-site` criado (privado, topic e time `bento-churrasqueiras`).
- Elementor Pro confirmado pelo cliente.
- MCP do Elementor da Bento conectado: `bento-churrasqueiras-elementor`, escopo local da pasta `Bento Churrasqueiras` (22 ferramentas, Editor atômico ativo). O MCP `lideratti-elementor` é de outro cliente — não usar aqui.
- Decisão: configurador "Monte sua churrasqueira" (Staggs) fora do lançamento; decidir depois entre manter o Staggs ou refazer em código.

- Figma do cliente conectado via MCP (conta Gmail, plano Starter = 20 leituras/mês). Paleta, fontes, logo/símbolo em SVG e estrutura da home extraídos → `docs/figma.md`, `assets/marca/`, `referencias/figma-site-completo.png`. 3 leituras usadas.
- Textos da home: coletados do site atual e reescritos (atual × proposta, sem inventar fatos) → `docs/textos-home.md`, com 6 pendências para o cliente.
- **Home em código** (`index.html`, `css/estilo.css`, `js/main.js`): segue o Figma (hero, header em pílulas de vidro, linhas, prova social, contato, newsletter, rodapé) com os textos da proposta e as 4 linhas do site atual. Fotos de SmartGrill, DuraGrill e Acessórios vêm do site atual (630×477, baixa resolução); a grelha usa o render do Figma. Conferida em 1920px e 390px, sem rolagem horizontal.
- Limite do Figma: o arquivo está no time V4 (6 leituras/mês), já esgotado. A seção de prova social foi montada a partir do screenshot.
- Seção de produtos: testados fundos (inox, nome da linha, claro/escuro, brasa) e layouts (vitrine fixa, editorial, vitrine sangrada, **vitrine ambiente**). Direção atual: **A3 · vitrine ambiente** — fundo escuro, cena de ambiente gerada por IA ocupando a metade direita, troca no scroll. Decidido: fotos de obra atuais não servem; cada linha terá uma imagem de ambiente em IA no padrão da foto da abertura. O render da grelha com legendas vai para a página do produto ("raio-X").
- ⚠️ O render da grelha (do Figma) tem marcas "INNOVARE" e "KAFER" nas bordas — confirmar origem antes de publicar.
- Home refinada (25/09): menu tradicional (pedido do cliente) não fixo; revelação linha a linha nos títulos; selo com texto real; prova social no **claro quente** (#F2EEE9) sem cards, com contagem nos números; contato vira fechamento no escuro quente com canais em lista; newsletter trocada por **"Receba o catálogo" pedindo WhatsApp** (vira Fluent Forms). Regra de dois tons: escuro quente = clima, claro quente = informação.
- Botões refinados definitivos (principal laranja só para conversão; secundário em contorno laranja; link com sublinhado que cresce). Fita de LED quente acima de "Conheça nossas linhas".
- **Revisão geral (25/09):** 7 larguras (1920→360): sem rolagem horizontal, sem erros de console, sem imagens quebradas; home com ~720 KB e 31 requests (meta < 1,5 MB / 60). Corrigido: vitrine no celular caía no layout antigo claro → criada versão mobile da vitrine ambiente (escura, cena no topo de cada produto); alvos de toque ≥ 44px no rodapé/canais/links; CTAs encurtam no celular ("Pedir orçamento", "Receber").
- **Limpeza do código (25/09):** vitrine ambiente passou para `estilo.css`/`main.js` com HTML estático (índice 01–04 e cenas no HTML, pronto para o Elementor); removidos os 4 arquivos de comparação (`comparar-*`), listas de checks e fotos de obra escondidas, regras CSS mortas e 8 assets sem uso. Mantidos para uso futuro: `assets/img/grelha-elevacao-manual.webp` (render com legendas → página do produto) e `assets/marca/logo-bento.svg`. Home: ~630 KB, 21 requests, zero erros.
- **Página Produtos** (`produtos/index.html`): hub escalável — abertura com atalhos por família, **capítulo por família** (cena + fichas que se ajustam de 1 a 5 produtos), **comparativo SmartGrill × DuraGrill** (tabela que aguenta N modelos; com 2 cabe no celular), "Como funciona" em 4 passos, contato e catálogo. Conteúdo centralizado em `docs/produtos.md`. Diferença SmartGrill × DuraGrill vem do post oficial do Instagram; textos da home ajustados para bater. Previsto: +2 linhas (tipo a definir).
- **Catálogo 2026 (PDF) incorporado:** linhas novas Elevatto e Espetos suspensos, Suporte de fundo como linha própria. Produtos do site antigo fora do catálogo mantidos (decisão do Lucas, revisar depois). Produtos agora em 4 famílias (Rotativas · Grelhas e elevação · Linha minimalista · Acessórios); comparativo segue o catálogo (as duas rotativas têm buchas autolubrificantes; diferencial da SmartGrill = frente removível). Home ganhou a Elevatto na vitrine (5 linhas); Elevatto nos menus e rodapé. ⚠️ Catálogo diz "mais de 15 anos" (são 22).
- **Página de linha (modelo) — `/grelhas/`:** abertura com cena + migalha + CTA com mensagem da linha, faixa de destaques, **raio-X** (seção fixa; legendas com linha, ponto e texto aparecem uma a uma conforme a rolagem; no celular vira foto com pontos numerados + lista), modelos com âncoras (#automatica, #manual, #parrilla), ficha técnica, galeria de projetos, dúvidas frequentes e outras linhas. Imagem do raio-X e galeria = **fotos do Catálogo 2026 (provisórias)**. (28/09: o render do cliente testado aqui era da Elevatto e foi para lá; Grelhas voltou à foto do catálogo até chegar um render da grelha automática. 21/10: chegou — raio-X com `grelhas/grelha-raiox.webp`, variante `raiox--paisagem`.)
- ⚠️ **Render da grelha era da KAFER** (concorrente) → removido do projeto.
- **Página Elevatto** (`/elevatto/`): mesmo modelo — abertura com selo "Novo · Catálogo 2026", destaques, raio-X (desde 28/09: **render do cliente** `elevatto/elevatto-raiox.webp`, variante horizontal `raiox--paisagem`), **recursos** em 2 colunas (variante para linha de produto único), ficha técnica **Elevatto × Grelha automática**, galeria, dúvidas e outras linhas. ⚠️ Perguntar ao cliente: qual assistente de voz (Alexa? Google?).

- **Página SmartGrill** (`/smartgrill/`): mesmo modelo — abertura, destaques, raio-X com o **render do cliente** (21/10, `smartgrill/smartgrill-raiox.webp`, variante `raiox--paisagem`), recursos em 2 colunas, ficha técnica **SmartGrill × DuraGrill**, galeria (4 fotos do catálogo), dúvidas e outras linhas. Novo bloco **Manuais e cuidados** (PDFs do site atual) na coluna das dúvidas, reaproveitável na DuraGrill. ⚠️ Perguntar ao cliente: o que é o "descanso balanço" (opcional) e o manual completo de instalação da linha Smart (link quebrado no site atual).

- **Páginas DuraGrill, Suporte de fundo, Espetos suspensos e Acessórios (26/09):** todas as linhas de produto com página própria. DuraGrill no modelo da SmartGrill (ficha DuraGrill × SmartGrill; fato novo do site atual: **régua superior destacável** — comparativo da SmartGrill/Produtos atualizado); Suporte de fundo e Espetos suspensos com raio-X de 4 pontos e ficha comparando os dois; Acessórios no modelo de Grelhas (modelos com âncoras #bifeiras, #costelao, #espetos, sem raio-X). Galeria ganhou variante **horizontal** (`data-formato="paisagem"`) para fotos largas. Fotos: Catálogo 2026 (DuraGrill, Suporte, Espetos) e site atual, 630 px (Acessórios) — todas provisórias. (21/10: raio-X da DuraGrill passou para o **render do cliente** `duragrill/duragrill-raiox.webp`, variante `raiox--paisagem`, como na Elevatto.)
- ⚠️ Corrigido: a 4ª foto da galeria da SmartGrill era da DuraGrill (o PDF reaproveita a imagem em várias páginas; a foto aparece de fato na pág. 06, DuraGrill).

- **Página Projetos** (`/projetos/`): abertura institucional, **mosaico** de 35 fotos (catálogo + site atual) com **filtro por família** e **ampliação** (setas, teclado, deslizar no celular, Esc), "Como funciona" e contato. Legendas só com o nome do produto (21/10: o cliente decidiu não mostrar a cidade dos projetos). Fora do mosaico: Galeria6 do site atual (arquivo quebrado) e Galeria2 (coifa com a marca **BRAZERO** — confirmar se é projeto da Bento). No Elementor: galeria com filtro (Gallery do Pro ou Loop Grid + taxonomia).
- Corrigido: mensagem do WhatsApp no contato de Suporte de fundo, Espetos suspensos e Acessórios tinha perdido a palavra "orçamento".

- **Página Assistência** (`/assistencia/`): abertura, bloco escuro com "como acionar a garantia" (3 passos + condições do site atual) e **formulário de chamado** com os campos do Fluent Forms atual (nome, WhatsApp, e-mail, descrição, fotos do defeito) + produto (opcional, novo); dúvidas e manuais. Sem bloco de orçamento/catálogo (quem chega aqui já é cliente). No Elementor: manter o **Fluent Forms 5** existente, estilizado igual, e acrescentar o campo Produto.
- Corrigido no site todo: a máscara de revelação dos títulos cortava acentos de maiúsculas (Ê, É, Ú).

- **Páginas Empresa, Contato e Política de Privacidade (26/09):** Empresa com abertura em foto, propósito + 4 pilares, **linha do tempo** 2004 → 2009 → hoje (desenha no scroll; vertical no celular) e números + depoimentos da home. Contato com canais + formulário (campos do Fluent Forms 3 atual) no escuro e **mapa** (Google Maps, tons neutros que ganham cor no hover) no claro. Privacidade reescrita do zero como **rascunho LGPD** (a atual é o texto padrão do WordPress, sobre comentários e Gravatar), com índice fixo. **Site completo: nenhum link interno dá 404.**
- Foto "BRAZERO" era na verdade **BRAZEDO Restaurante** (cliente, não concorrente) → voltou ao mosaico de Projetos como parrilla.

## 27/09/2026 — Revisão geral (14 páginas × 6 larguras, textos × Catálogo 2026)
- **Checagem automática** (1920/1440/1024/768/390/360): zero erros de JS, zero rolagem horizontal, zero imagens quebradas, zero links/âncoras quebrados, IDs únicos, 1 H1 por página, hierarquia de títulos ok, todos os campos com rótulo.
- **Textos × catálogo:** páginas de produto batem item a item com o Catálogo 2026 (e com o site atual para o que não está no catálogo).
- ⚠️ **Corrigido — spec da KAFER na home:** o bloco "Grelhas" dizia "Linha de custo-benefício · Grelha de Elevação Manual · **35 kg de capacidade**" — isso vinha das legendas do render do Figma (produto da KAFER). Agora apresenta a família Grelhas (automática, manivela, parrilla), igual à página /grelhas/.
- Corrigido: home › Acessórios listava "Suportes de fundo" (hoje é linha própria) → trocado por Costelão.
- Corrigido: "Receba o catálogo — todas as linhas, **medidas e acabamentos**" (o PDF não tem medidas nem acabamentos) → "com fotos e detalhes de cada modelo".
- Corrigido: "Sua churrasqueira, do projeto **à instalação**" (não confirmado que a Bento instala) → "do projeto ao primeiro churrasco".
- Corrigido: "qualquer tipo de carne" → "diferentes tipos de carne" (texto do catálogo).
- Corrigido: **WhatsApp flutuante só aparecia na home** (o script procurava `.hero`) → agora aparece em todas as páginas depois da abertura.
- Corrigido (visual): alvos de toque ≥ 44px também no tablet; aviso "Deslize para comparar" na tabela de Grelhas no celular; galeria de 3 fotos no celular sem foto órfã e legendas em uma linha; palavras longas das tabelas com hifenização; campo do catálogo com 48px; rodapé com respiro para o botão flutuante.
- SEO: títulos encurtados para ≤ 61 caracteres e descrições ≤ 160.
- Peso: páginas entre 0,5 e 0,9 MB; Projetos 1,8 MB (36 fotos, carregam conforme a rolagem) e Contato 2,2 MB (quase tudo é o mapa do Google, carregado só ao chegar nele). Opcional: trocar o mapa por uma imagem com "abrir mapa".

## 21/10/2026 — Ajustes pedidos pelo cliente

- Garantia: "5 anos **na parte mecânica**" (antes "em motor e componentes") em todo o site.
- Grelhas automática e manual: instalação **conjugada ou lateral** à churrasqueira (antes "integrada"); ficha das grelhas ganhou a linha "Instalação".
- Elevação manual: sem "manivela" — agora "manual" / "na mão" em todo o site.
- Prévia de link (Open Graph) em todas as páginas com imagens em `assets/og/` e página `404.html` própria. Tags `og:url`/`og:image` já no domínio definitivo (bentochurrasqueiras.com.br) desde 28/10.
- Elevatto continua "integrada" (o sistema sobe os espetos junto) — confirmar com o cliente.

## Pendências do cliente (lista única — revisar juntos)

**Números e fatos da marca**
1. "+500 churrasqueiras entregues" é real? Há outro número bom (cidades, estados)?
2. O 2º WhatsApp (54) 99926-8929 está ativo?
3. Prazo médio de fabricação.
4. A Bento instala ou só entrega? (o site tem manual de instalação)
5. PDF do catálogo diz "mais de 15 anos" — são 22 (desde 2004).
6. Link do perfil do Google (avaliações).

**Produtos**
7. O que é o "descanso balanço" (opcional da SmartGrill e DuraGrill)?
8. Elevatto: qual assistente de voz (Alexa? Google?).
9. Suporte de fundo: como é fixado; aceita grelha e espetos juntos?; limpeza.
10. Espetos suspensos: o giro é manual (sem motor)?; quantos espetos cabem; limpeza.
11. Acessórios: diferença entre bifeira e cooktop (gás ou elétrico?); vende avulso para quem já tem churrasqueira?
12. Grelha manual, parrilla, bifeiras/cooktops, costelão e cestos continuam à venda? (não estão no Catálogo 2026)
13. Menu e home: incluir Suporte de fundo e Espetos suspensos? (hoje entram só pela página Produtos; a vitrine da home tem 5 linhas e não mostra a linha minimalista)

**Manuais e assistência**
14. Manual completo de instalação da linha Smart (link quebrado no site atual) e manual da DuraGrill, se houver.
15. Garantia: precisa de nota fiscal? Atendimento no local ou envio da peça? Atende fora do RS?

**Fotos e imagens**
16. Renders limpos da Bento para os raio-X (os atuais são fotos do catálogo; o render do Figma era da KAFER).
17. Fotos em alta das obras. ~~Cidade de cada projeto~~ — decidido em 21/10: não vamos mostrar cidade.
18. Fotos da fábrica e da equipe para a página Empresa.

**Privacidade e acesso**
19. Revisar a Política de Privacidade (rascunho) com o jurídico; confirmar quais ferramentas rodam no Google Tag Manager/Stape (Google Analytics? Meta Pixel?) e o canal de privacidade (hoje vendas@).
20. Aviso de cookies: o site não tem. Recomendado, se houver cookies de publicidade.
21. Acesso admin ao WordPress.
22. E-mail "Projetos, arquitetos e revendas": a Bento trabalha com revendas? (texto do contato)
23. Catálogo PDF: frase de abertura "Tecnologia e tradição unidas pela paixão de assar" pode virar texto da Empresa, se o cliente quiser.

- **Movimento reduzido (28/09):** o site desligava todas as animações quando o sistema pede menos movimento (Windows "Efeitos de animação" desligado, macOS "Reduzir movimento"), e por isso parecia quebrado em alguns computadores. Agora, nesse modo, ficam os esmaecimentos (títulos, blocos, legendas do raio-X no scroll) e a contagem dos números; saem deslocamento, zoom, giro do selo, carrossel contínuo e rolagem suave. Regras no fim do `estilo.css`.

### Próximos passos
1. **Revisar as pendências acima com o cliente.**
2. **Cenas por IA:** recebidas em 28/09 as de **SmartGrill, DuraGrill, Elevatto e Acessórios** (`assets/img/<linha>/cena-<linha>.webp`) — já na vitrine da home, na abertura das 4 páginas de linha e nos capítulos/faixas de Produtos (Rotativas usa a DuraGrill). A abertura das páginas de linha passou a mostrar a foto só nos 72% da direita (as cenas têm a churrasqueira no centro). Grelhas recebida em seguida (`grelhas/cena-grelhas.webp`, churrasqueira à direita → `background-position` à direita no HTML), na home e na abertura de /grelhas/. **Faltam:** Suporte de fundo, Espetos suspensos (família Minimalista) e a **versão vertical da hero** para o celular.
3. Montagem no Elementor só quando o Lucas liberar.

## 28/10/2026 — Formulários ligados ao Salos

- Os formulários (catálogo, contato, assistência) mandam para `api/lead.js` (função da Vercel), que cria contato + card no Salos (funil Ativação › Entrada, origem "Site", etiqueta `Site · Catálogo|Contato|Assistência`, campanha UTM junto).
- Automações no Salos "Site · … → WhatsApp": a etiqueta no contato dispara a mensagem pelo WhatsApp "Davi Comercial" e a etiqueta sai do contato (assim um novo pedido dispara de novo; o card continua etiquetado).
- Catálogo 2026 publicado em `/assets/catalogo/catalogo-bento-2026.pdf` (link vai na mensagem).
- Contato: WhatsApp passou a ser obrigatório. Assistência: sem anexo no site; a mensagem pede as fotos no WhatsApp.
- Proteção: só aceita envio com Origin do site, campo invisível contra robôs e no máximo um lead por número/formulário/dia (external_ref derivado no servidor).
- Depende da variável `SALOS_API_KEY` (escopo `leads:write`) no projeto da Vercel da Bento.
- Botões de WhatsApp do número (54) 99688-9900 agora usam **links de captura do Salos** (`app.salos.com.br/l/<código>`), um por mensagem: Orçamento geral (inclui o flutuante e o rodapé), SmartGrill, DuraGrill, Elevatto, Grelhas, Acessórios, Suporte de fundo, Espetos suspensos, Começar projeto, Ajuda para escolher, Assistência técnica. O lead cai em Ativação › Entrada com origem "Site". Cliques/conversas/negócios por link na tela de Links do Salos. O 2º número (54) 99926-8929 ficou como `wa.me` (não está conectado ao Salos).

## 28/10/2026 — SEO pós-lançamento

- `sitemap.xml` (13 páginas) e `robots.txt` (bloqueia só `/api/`, aponta o sitemap).
- `<link rel="canonical">` em todas as páginas (resolve `/smartgrill` × `/smartgrill/`).
- Dados estruturados: home com LocalBusiness completo (CEP, logo, imagem, redes, área atendida) + WebSite; BreadcrumbList nas páginas internas.
- Títulos com termos mais buscados: home "Churrasqueiras rotativas sob medida", Espetos suspensos "para churrasqueira", Acessórios "Bifeiras, cooktops e espetos em Inox", Projetos "Projetos de churrasqueiras sob medida".
- `vercel.json`: 301 dos endereços do WordPress antigo que o Google ainda tinha (`/produtos-old/*`, `/produtos/<item>`, `/churrasqueiras-rotativas-em-garibaldi/`, posts e tags do blog, loja, LPs, testes) para as páginas novas.
- **Falta (Lucas):** Search Console — enviar o sitemap e acompanhar 404 por algumas semanas; criar redirecionamento para o que aparecer lá.
- Fase 2: página local "churrasqueiras rotativas em Garibaldi/Serra Gaúcha" (o site antigo tinha uma indexada) e retomar o blog.
