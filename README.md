<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Renda Extra com Inteligência Artificial — Playbook 2026</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#0b1220;
    --ink-2:#0f1830;
    --paper:#f4efe4;
    --paper-dim:#b9c2d4;
    --gold:#d9a441;
    --gold-soft:#f0d8a0;
    --mint:#3fbfad;
    --warn:#da5a4e;
    --card:#121b33;
    --line:rgba(244,239,228,0.14);
    --radius:14px;
  }
  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{
    margin:0;
    background:var(--ink);
    color:var(--paper);
    font-family:'Inter',sans-serif;
    line-height:1.55;
    -webkit-font-smoothing:antialiased;
  }
  h1,h2,h3,.display{font-family:'Space Grotesk',sans-serif;}
  .mono{font-family:'JetBrains Mono',monospace;}
  a{color:inherit;}
  img{max-width:100%;}
  .wrap{max-width:1080px;margin:0 auto;padding:0 24px;}
  .eyebrow{
    display:inline-flex;align-items:center;gap:8px;
    font-family:'JetBrains Mono',monospace;
    font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;
    color:var(--gold-soft);
    border:1px solid rgba(217,164,65,.35);
    background:rgba(217,164,65,.08);
    padding:6px 14px;border-radius:999px;
  }
  .eyebrow::before{content:"●";color:var(--mint);font-size:8px;}

  /* HERO */
  .hero{
    padding:72px 0 56px;
    background:
      radial-gradient(900px 420px at 85% -10%, rgba(63,191,173,.18), transparent 60%),
      radial-gradient(700px 380px at 5% 0%, rgba(217,164,65,.14), transparent 60%);
    border-bottom:1px solid var(--line);
  }
  .hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center;}
  @media(max-width:860px){.hero-grid{grid-template-columns:1fr;}}
  .hero h1{
    font-size:clamp(32px,5vw,52px);
    line-height:1.05;
    margin:18px 0 16px;
    font-weight:700;
  }
  .hero h1 span{color:var(--gold);}
  .hero p.lead{color:var(--paper-dim);font-size:17px;max-width:52ch;margin:0 0 28px;}
  .cta-row{display:flex;gap:14px;flex-wrap:wrap;align-items:center;}
  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    padding:16px 26px;border-radius:10px;font-weight:700;font-size:15.5px;
    text-decoration:none;cursor:pointer;border:none;transition:transform .15s ease, box-shadow .15s ease;
    font-family:'Inter',sans-serif;
  }
  .btn-primary{background:var(--gold);color:#1a1200;box-shadow:0 8px 24px rgba(217,164,65,.28);}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(217,164,65,.38);}
  .btn-ghost{background:transparent;color:var(--paper);border:1px solid var(--line);}
  .btn-ghost:hover{border-color:var(--paper-dim);}
  .price-note{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--paper-dim);margin-top:10px;}

  /* Receipt / ledger card in hero */
  .ledger{
    background:var(--paper);
    color:#1a1a1a;
    border-radius:4px;
    padding:26px 24px;
    position:relative;
    box-shadow:0 30px 60px -20px rgba(0,0,0,.55);
    transform:rotate(1.2deg);
  }
  .ledger::before,.ledger::after{
    content:"";position:absolute;left:0;right:0;height:10px;
    background:
      radial-gradient(circle at 8px 5px, var(--ink) 5px, transparent 5.5px) repeat-x;
    background-size:16px 10px;
  }
  .ledger::before{top:-5px;}
  .ledger::after{bottom:-5px;transform:scaleY(-1);}
  .ledger h4{
    font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.08em;
    text-transform:uppercase;color:#555;margin:0 0 14px;text-align:center;
    border-bottom:1px dashed #999;padding-bottom:10px;
  }
  .ledger-row{
    display:flex;justify-content:space-between;gap:10px;
    font-family:'JetBrains Mono',monospace;font-size:13px;
    padding:7px 0;border-bottom:1px dashed #ccc;
  }
  .ledger-row span:first-child{color:#333;}
  .ledger-row span:last-child{color:#0a7a5c;font-weight:700;}
  .ledger-total{
    display:flex;justify-content:space-between;margin-top:12px;padding-top:12px;
    border-top:1px solid #333;font-family:'JetBrains Mono',monospace;font-weight:700;
  }

  section{padding:68px 0;}
  .section-head{max-width:640px;margin-bottom:40px;}
  .section-head .eyebrow{margin-bottom:14px;}
  .section-head h2{font-size:clamp(24px,3.4vw,34px);margin:0 0 10px;}
  .section-head p{color:var(--paper-dim);margin:0;font-size:15.5px;}

  .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
  @media(max-width:900px){.why-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:560px){.why-grid{grid-template-columns:1fr;}}
  .card{
    background:var(--card);border:1px solid var(--line);border-radius:var(--radius);
    padding:22px 20px;
  }
  .card h3{font-size:16.5px;margin:0 0 8px;}
  .card p{color:var(--paper-dim);font-size:14px;margin:0;}

  /* Methods with level filter */
  .filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:26px;}
  .chip{
    font-family:'JetBrains Mono',monospace;font-size:12.5px;letter-spacing:.04em;
    padding:8px 16px;border-radius:999px;border:1px solid var(--line);
    background:transparent;color:var(--paper-dim);cursor:pointer;
  }
  .chip.active{background:var(--gold);color:#1a1200;border-color:var(--gold);font-weight:700;}
  .method-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  @media(max-width:860px){.method-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:560px){.method-grid{grid-template-columns:1fr;}}
  .method-card{display:none;}
  .method-card.show{display:block;}
  .tag{
    display:inline-block;font-family:'JetBrains Mono',monospace;font-size:10.5px;
    letter-spacing:.08em;text-transform:uppercase;padding:4px 9px;border-radius:5px;
    margin-bottom:12px;
  }
  .tag.iniciante{background:rgba(63,191,173,.15);color:var(--mint);}
  .tag.intermediario{background:rgba(217,164,65,.16);color:var(--gold-soft);}
  .tag.avancado{background:rgba(218,90,78,.16);color:#f0928a;}

  /* Comparison table */
  .table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--radius);}
  table{width:100%;border-collapse:collapse;font-size:13.5px;min-width:720px;}
  th,td{padding:14px 16px;text-align:left;border-bottom:1px solid var(--line);}
  th{
    font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;
    text-transform:uppercase;color:var(--paper-dim);background:var(--ink-2);
  }
  td.mono-cell{font-family:'JetBrains Mono',monospace;color:var(--mint);}
  tr:last-child td{border-bottom:none;}

  /* 7 day receipt strip - signature element */
  .plan-strip{display:flex;gap:14px;overflow-x:auto;padding:6px 6px 18px;scroll-snap-type:x mandatory;}
  .plan-tab{
    scroll-snap-align:start;flex:0 0 220px;
    background:var(--card);border:1px solid var(--line);border-radius:10px;
    padding:18px;position:relative;cursor:pointer;transition:border-color .15s;
  }
  .plan-tab.open{border-color:var(--gold);}
  .plan-tab .day{
    font-family:'JetBrains Mono',monospace;color:var(--gold);font-size:12px;
    letter-spacing:.08em;text-transform:uppercase;
  }
  .plan-tab h4{margin:8px 0 6px;font-size:15px;}
  .plan-tab p{
    color:var(--paper-dim);font-size:13px;margin:0;
    max-height:0;overflow:hidden;transition:max-height .25s ease;
  }
  .plan-tab.open p{max-height:120px;}
  .plan-tab .hint{font-size:11px;color:var(--paper-dim);opacity:.6;margin-top:8px;}
  .plan-tab.open .hint{display:none;}

  /* Mistakes */
  .mistake-list{display:grid;gap:14px;}
  .mistake{
    display:flex;gap:16px;background:var(--card);border:1px solid var(--line);
    border-left:3px solid var(--warn);border-radius:10px;padding:18px 20px;
  }
  .mistake h4{margin:0 0 6px;font-size:15.5px;}
  .mistake p{margin:0;color:var(--paper-dim);font-size:14px;}

  /* Tools */
  .tools-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
  @media(max-width:860px){.tools-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:560px){.tools-grid{grid-template-columns:1fr;}}
  .tool-card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:18px;}
  .tool-card .cat{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--mint);letter-spacing:.06em;text-transform:uppercase;}
  .tool-card p{margin:8px 0 0;font-size:13.5px;color:var(--paper-dim);}

  /* Offer */
  .offer{
    background:linear-gradient(160deg, var(--ink-2), var(--ink));
    border:1px solid rgba(217,164,65,.35);
    border-radius:20px;padding:44px;text-align:center;
    position:relative;overflow:hidden;
  }
  .offer::before{
    content:"";position:absolute;inset:0;
    background:radial-gradient(500px 260px at 50% -20%, rgba(217,164,65,.22), transparent 60%);
  }
  .offer-inner{position:relative;z-index:1;}
  .offer h2{font-size:clamp(24px,3.6vw,32px);margin:0 0 10px;}
  .offer p{color:var(--paper-dim);max-width:48ch;margin:0 auto 28px;}
  .price-tag{
    font-family:'JetBrains Mono',monospace;font-size:44px;font-weight:700;color:var(--gold);
    margin-bottom:6px;
  }
  .price-tag sup{font-size:20px;top:-1.2em;}
  .offer-note{font-size:13px;color:var(--paper-dim);margin-bottom:26px;}
  .guarantee{
    display:inline-flex;align-items:center;gap:8px;margin-top:18px;
    font-size:13px;color:var(--paper-dim);
  }

  /* FAQ accordion */
  .faq-item{border-bottom:1px solid var(--line);}
  .faq-q{
    width:100%;text-align:left;background:none;border:none;color:var(--paper);
    font-family:'Inter',sans-serif;font-size:15.5px;font-weight:600;
    padding:20px 4px;display:flex;justify-content:space-between;align-items:center;
    cursor:pointer;
  }
  .faq-q::after{content:"+";font-size:20px;color:var(--gold);transition:transform .2s;}
  .faq-item.open .faq-q::after{transform:rotate(45deg);}
  .faq-a{max-height:0;overflow:hidden;transition:max-height .25s ease;color:var(--paper-dim);font-size:14.5px;padding:0 4px;}
  .faq-item.open .faq-a{max-height:220px;padding-bottom:18px;}

  footer{border-top:1px solid var(--line);padding:32px 0;text-align:center;color:var(--paper-dim);font-size:13px;}

  /* Sticky bar */
  .sticky-bar{
    position:fixed;left:0;right:0;bottom:-90px;z-index:60;
    background:rgba(11,18,32,.92);backdrop-filter:blur(10px);
    border-top:1px solid var(--line);
    padding:14px 20px;display:flex;align-items:center;justify-content:space-between;
    gap:16px;transition:bottom .3s ease;
  }
  .sticky-bar.show{bottom:0;}
  .sticky-bar .info{font-size:14px;}
  .sticky-bar .info b{color:var(--gold);font-family:'JetBrains Mono',monospace;}
  @media(max-width:520px){.sticky-bar .info{display:none;}}

  /* Modal checkout */
  .modal-overlay{
    position:fixed;inset:0;background:rgba(6,9,18,.78);
    display:none;align-items:center;justify-content:center;z-index:100;padding:20px;
  }
  .modal-overlay.open{display:flex;}
  .modal-box{
    background:var(--ink-2);border:1px solid var(--line);border-radius:16px;
    width:100%;max-width:480px;max-height:88vh;overflow:hidden;
    display:flex;flex-direction:column;
  }
  .modal-head{
    display:flex;justify-content:space-between;align-items:center;
    padding:16px 20px;border-bottom:1px solid var(--line);
  }
  .modal-head h3{margin:0;font-size:15px;}
  .modal-close{background:none;border:none;color:var(--paper-dim);font-size:20px;cursor:pointer;}
  .modal-body{flex:1;overflow:auto;}
  .modal-body iframe{width:100%;height:70vh;border:none;}
  .modal-fallback{padding:16px 20px;font-size:13px;color:var(--paper-dim);border-top:1px solid var(--line);}
  .modal-fallback a{color:var(--mint);font-weight:600;}
</style>
</head>
<body>

  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <span class="eyebrow">Playbook 2026 · Ebook digital</span>
        <h1>Renda extra com <span>Inteligência Artificial</span></h1>
        <p class="lead">Um guia prático para começar a ganhar dinheiro com IA — sem promessas de riqueza rápida, com passos reais que você pode aplicar essa semana.</p>
        <div class="cta-row">
          <button class="btn btn-primary" onclick="openCheckout()">Quero o ebook agora — R$ 27,49</button>
          <a class="btn btn-ghost" href="#plano">Ver o plano de 7 dias</a>
        </div>
        <div class="price-note">Acesso imediato após a compra · pagamento processado pela Kiwify</div>
      </div>
      <div class="ledger">
        <h4>Potencial por método / mês</h4>
        <div class="ledger-row"><span>Conteúdo com IA</span><span>R$300–1.500</span></div>
        <div class="ledger-row"><span>Serviços freelance</span><span>R$500–2.500</span></div>
        <div class="ledger-row"><span>Produtos digitais</span><span>R$300–2.000</span></div>
        <div class="ledger-row"><span>Agentes e automação</span><span>R$1.500–5.000</span></div>
        <div class="ledger-row"><span>Sites e sistemas</span><span>R$800–4.000</span></div>
        <div class="ledger-row"><span>SaaS com IA</span><span>R$2.000–10.000+</span></div>
        <div class="ledger-total"><span>Fonte</span><span>Playbook 2026</span></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Por que agora</span>
        <h2>A oportunidade é real — e a barreira nunca foi tão baixa</h2>
        <p>Sem enrolação: o que mudou e por que vale a pena começar hoje.</p>
      </div>
      <div class="why-grid">
        <div class="card"><h3>Barreira de entrada baixa</h3><p>Ferramentas gratuitas ou baratas já fazem o trabalho que antes exigia equipe e orçamento alto.</p></div>
        <div class="card"><h3>Demanda crescente</h3><p>Empresas locais e negócios pequenos ainda não usam IA no dia a dia — espaço aberto para quem sabe aplicar.</p></div>
        <div class="card"><h3>Não exige ser programador</h3><p>Dá para vender resultado (conteúdo, automação, atendimento) sem escrever uma linha de código.</p></div>
        <div class="card"><h3>Escalável aos poucos</h3><p>Começa como renda extra nas horas livres e cresce conforme os primeiros clientes aparecem.</p></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">6 caminhos</span>
        <h2>Formas de ganhar dinheiro com IA</h2>
        <p>Filtre por nível e veja o que combina com onde você está agora.</p>
      </div>
      <div class="filters" id="filters">
        <button class="chip active" data-level="todos">Todos</button>
        <button class="chip" data-level="iniciante">Iniciante</button>
        <button class="chip" data-level="intermediario">Intermediário</button>
        <button class="chip" data-level="avancado">Avançado</button>
      </div>
      <div class="method-grid" id="methodGrid">
        <div class="method-card show card" data-level="iniciante"><span class="tag iniciante">Iniciante</span><h3>Conteúdo com IA</h3><p>Textos, posts e roteiros para redes sociais e blogs.</p></div>
        <div class="method-card show card" data-level="iniciante"><span class="tag iniciante">Iniciante</span><h3>Serviços freelance</h3><p>Copy, design e edição de vídeo usando IA como acelerador.</p></div>
        <div class="method-card show card" data-level="iniciante"><span class="tag iniciante">Iniciante</span><h3>Produtos digitais</h3><p>E-books, templates e pacotes de prompts prontos para vender.</p></div>
        <div class="method-card show card" data-level="intermediario"><span class="tag intermediario">Intermediário</span><h3>Agentes e automação</h3><p>Atendimento e prospecção automatizados para negócios locais.</p></div>
        <div class="method-card show card" data-level="intermediario"><span class="tag intermediario">Intermediário</span><h3>Sites e sistemas com IA</h3><p>Criação rápida de sites e ferramentas sob medida para clientes.</p></div>
        <div class="method-card show card" data-level="avancado"><span class="tag avancado">Avançado</span><h3>SaaS com IA</h3><p>Ferramenta de nicho vendida por assinatura recorrente.</p></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Comparativo</span>
        <h2>Investimento, tempo e potencial de cada método</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Método</th><th>Ferramentas</th><th>Investimento</th><th>1º resultado</th><th>Potencial/mês</th></tr></thead>
          <tbody>
            <tr><td>Conteúdo com IA</td><td>ChatGPT, Claude, Canva</td><td>Baixo (grátis–R$100)</td><td>1–2 semanas</td><td class="mono-cell">R$300–1.500</td></tr>
            <tr><td>Serviços freelance</td><td>Claude, Canva, CapCut</td><td>Baixo (grátis–R$150)</td><td>2–4 semanas</td><td class="mono-cell">R$500–2.500</td></tr>
            <tr><td>Produtos digitais</td><td>ChatGPT, Canva, Gumroad</td><td>Baixo (grátis–R$100)</td><td>3–4 semanas</td><td class="mono-cell">R$300–2.000</td></tr>
            <tr><td>Agentes e automação</td><td>n8n, Make, Claude API</td><td>Médio (R$150–500)</td><td>1–2 meses</td><td class="mono-cell">R$1.500–5.000</td></tr>
            <tr><td>Sites e sistemas</td><td>Claude Code, Netlify</td><td>Médio (R$100–400)</td><td>3–6 semanas</td><td class="mono-cell">R$800–4.000</td></tr>
            <tr><td>SaaS com IA</td><td>Supabase, Stripe, Claude API</td><td>Alto (R$500+)</td><td>2–4 meses</td><td class="mono-cell">R$2.000–10.000+</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section id="plano">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Mãos à obra</span>
        <h2>Plano de ação: primeiros 7 dias</h2>
        <p>Um passo por dia, sem travar no planejamento. Toque em cada dia para abrir.</p>
      </div>
      <div class="plan-strip" id="planStrip">
        <div class="plan-tab" data-day="1"><div class="day">Dia 1</div><h4>Escolher nicho e monetização</h4><p>Defina em qual dos 6 caminhos você vai focar primeiro.</p><div class="hint">toque para abrir</div></div>
        <div class="plan-tab" data-day="2"><div class="day">Dia 2</div><h4>Testar 2–3 ferramentas de IA</h4><p>Coloque a mão na massa antes de qualquer planejamento longo.</p><div class="hint">toque para abrir</div></div>
        <div class="plan-tab" data-day="3"><div class="day">Dia 3</div><h4>Criar portfólio ou amostra</h4><p>3 a 5 exemplos de trabalho, mesmo sem clientes ainda.</p><div class="hint">toque para abrir</div></div>
        <div class="plan-tab" data-day="4"><div class="day">Dia 4</div><h4>Definir preço e montar oferta</h4><p>Um serviço de entrada, acessível, para conquistar os primeiros clientes.</p><div class="hint">toque para abrir</div></div>
        <div class="plan-tab" data-day="5"><div class="day">Dia 5</div><h4>Divulgar em 1 canal</h4><p>Instagram, WhatsApp Business ou plataforma de freelance.</p><div class="hint">toque para abrir</div></div>
        <div class="plan-tab" data-day="6"><div class="day">Dia 6</div><h4>Contato direto com clientes</h4><p>Prospecção ativa em vez de esperar o cliente aparecer.</p><div class="hint">toque para abrir</div></div>
        <div class="plan-tab" data-day="7"><div class="day">Dia 7</div><h4>Ajustar a oferta</h4><p>Use o retorno recebido para refinar preço e proposta.</p><div class="hint">toque para abrir</div></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Atenção</span>
        <h2>Erros comuns que iniciantes cometem</h2>
      </div>
      <div class="mistake-list">
        <div class="mistake"><div><h4>Achar que vai ficar rico rápido</h4><p>IA acelera o trabalho, mas resultado consistente ainda exige constância e meses de prática.</p></div></div>
        <div class="mistake"><div><h4>Não focar em um nicho</h4><p>Tentar atender todo mundo dilui a oferta. Um público específico gera mais confiança e vendas.</p></div></div>
        <div class="mistake"><div><h4>Ignorar a entrega de valor real</h4><p>Usar IA sem revisar o resultado entrega conteúdo genérico — o cliente sente e não volta.</p></div></div>
        <div class="mistake"><div><h4>Precificar errado o próprio trabalho</h4><p>Cobrar muito pouco no início queima a margem; cobrar sem entender o mercado afasta clientes.</p></div></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Ferramentas</span>
        <h2>O que você vai usar no dia a dia</h2>
      </div>
      <div class="tools-grid">
        <div class="tool-card"><div class="cat">Conteúdo &amp; texto</div><p>ChatGPT, Claude, Canva</p></div>
        <div class="tool-card"><div class="cat">Vídeo &amp; áudio</div><p>CapCut, Runway, ElevenLabs</p></div>
        <div class="tool-card"><div class="cat">Automação</div><p>n8n, Make, Zapier</p></div>
        <div class="tool-card"><div class="cat">Design &amp; imagem</div><p>Midjourney, Leonardo AI</p></div>
        <div class="tool-card"><div class="cat">Atendimento</div><p>Typebot, chatbots com IA</p></div>
        <div class="tool-card"><div class="cat">Sites &amp; sistemas</div><p>Claude Code, Netlify, Supabase</p></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="offer">
        <div class="offer-inner">
          <span class="eyebrow">Comece pequeno. Comece hoje.</span>
          <h2 style="margin-top:16px;">Playbook 2026 completo, em PDF</h2>
          <p>Renda extra com IA não é sobre a ferramenta perfeita — é sobre entregar valor real, de forma consistente, para as pessoas certas.</p>
          <div class="price-tag"><sup>R$</sup> 27,49</div>
          <div class="offer-note">Pagamento único · acesso imediato · Pix, cartão ou boleto via Kiwify</div>
          <button class="btn btn-primary" onclick="openCheckout()">Comprar agora</button>
          <div class="guarantee">Compra 100% segura, processada pela Kiwify</div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap" style="max-width:760px;">
      <div class="section-head">
        <span class="eyebrow">Dúvidas</span>
        <h2>Perguntas frequentes</h2>
      </div>
      <div id="faq">
        <div class="faq-item">
          <button class="faq-q">Preciso saber programar?<span></span></button>
          <div class="faq-a">Não. O playbook foca em métodos que não exigem escrever código — conteúdo, serviços freelance e produtos digitais.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q">Em quanto tempo vejo resultado?</button>
          <div class="faq-a">Depende do método escolhido. Os caminhos mais rápidos (conteúdo e freelance) costumam trazer primeiro resultado em 1 a 4 semanas de aplicação constante.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q">Como recebo o ebook depois de comprar?</button>
          <div class="faq-a">O acesso é liberado imediatamente após a confirmação do pagamento, direto pela plataforma da Kiwify.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q">Quais formas de pagamento estão disponíveis?</button>
          <div class="faq-a">Pix, cartão de crédito e boleto, processados com segurança pela Kiwify.</div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    Playbook 2026 · Renda Extra com Inteligência Artificial — pagamento processado com segurança pela Kiwify.
  </footer>

  <div class="sticky-bar" id="stickyBar">
    <div class="info">Playbook 2026 <b>R$ 27,49</b> · acesso imediato</div>
    <button class="btn btn-primary" onclick="openCheckout()" style="padding:12px 20px;font-size:14px;">Comprar agora</button>
  </div>

  <div class="modal-overlay" id="modalOverlay">
    <div class="modal-box">
      <div class="modal-head">
        <h3>Finalizar compra — R$ 27,49</h3>
        <button class="modal-close" onclick="closeCheckout()">×</button>
      </div>
      <div class="modal-body">
        <iframe id="checkoutFrame" src="" loading="lazy"></iframe>
      </div>
      <div class="modal-fallback">
        Se o checkout não carregar aqui, <a href="https://pay.kiwify.com.br/cBcTlyf" target="_blank" rel="noopener">abra em uma nova aba</a>.
      </div>
    </div>
  </div>

<script>
  const CHECKOUT_URL = "https://pay.kiwify.com.br/cBcTlyf";

  function openCheckout(){
    const overlay = document.getElementById('modalOverlay');
    const frame = document.getElementById('checkoutFrame');
    frame.src = CHECKOUT_URL;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCheckout(){
    document.getElementById('modalOverlay').classList.remove('open');
    document.getElementById('checkoutFrame').src = '';
    document.body.style.overflow = '';
  }
  document.getElementById('modalOverlay').addEventListener('click', (e)=>{
    if(e.target.id === 'modalOverlay') closeCheckout();
  });

  // Level filter
  document.getElementById('filters').addEventListener('click', (e)=>{
    if(!e.target.classList.contains('chip')) return;
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    const level = e.target.dataset.level;
    document.querySelectorAll('.method-card').forEach(card=>{
      card.classList.toggle('show', level === 'todos' || card.dataset.level === level);
    });
  });

  // 7-day plan tabs
  document.querySelectorAll('.plan-tab').forEach(tab=>{
    tab.addEventListener('click', ()=> tab.classList.toggle('open'));
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.querySelector('.faq-q').addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });

  // Sticky bar on scroll
  const stickyBar = document.getElementById('stickyBar');
  const heroEl = document.querySelector('.hero');
  window.addEventListener('scroll', ()=>{
    const heroBottom = heroEl.getBoundingClientRect().bottom;
    stickyBar.classList.toggle('show', heroBottom < 0);
  });
</script>
</body>
</html>
