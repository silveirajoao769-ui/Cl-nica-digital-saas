# Clínica Digital — SaaS multi-tenant

Plataforma completa de agendamento, pagamento online e gestão para clínicas e
consultórios de qualquer especialidade (dentista, psicólogo, nutricionista,
dermatologista, etc).

## O que já vem pronto no código

- **Área do paciente**: listagem de serviços por clínica (`/[clinicSlug]`),
  agendamento com escolha de profissional/data/horário, checkout via Stripe
  (cartão parcelado ou Pix) e histórico de agendamentos.
- **Área da clínica** (`/admin/[clinicSlug]`): dashboard com KPIs (agendamentos
  dia/semana/mês, faturamento total e por profissional), gestão de
  agendamentos, módulo financeiro (parcelas, convênios, repasse por
  profissional), prontuário básico e cadastro de serviços.
- **Multi-tenant real**: todo dado é isolado por `clinicId` no banco; cada
  clínica tem sua própria URL (`/nome-da-clinica`) e painel administrativo
  separado (`/admin/nome-da-clinica`).
- **Autenticação com papéis** (NextAuth): `CLINIC_ADMIN`, `PROFESSIONAL`,
  `PATIENT`.
- **Webhook do Stripe** que confirma o agendamento e gera as parcelas
  automaticamente após o pagamento.

## O que você precisa configurar (não incluso, requer suas próprias contas)

Isso é um produto real — para funcionar em produção você precisa criar contas
gratuitas/pagas nestes serviços e colocar as chaves no `.env`:

1. **Banco de dados PostgreSQL** — recomendado [Supabase](https://supabase.com)
   (tem plano gratuito). Crie um projeto, copie a "Connection string" em
   Project Settings → Database, e cole em `DATABASE_URL`.
2. **Stripe** — crie conta em [stripe.com](https://stripe.com), pegue as
   chaves de teste em *Developers → API keys*. Para Pix funcionar, sua conta
   Stripe precisa estar habilitada para o Brasil (Stripe Brasil).
3. **Webhook do Stripe** — em produção, configure em *Developers → Webhooks*
   apontando para `https://SEU_DOMINIO/api/webhooks/stripe`, evento
   `checkout.session.completed`. Copie o "Signing secret" para
   `STRIPE_WEBHOOK_SECRET`.
4. **NEXTAUTH_SECRET** — gere com `openssl rand -base64 32`.

## Rodando localmente

```bash
npm install
cp .env.example .env
# preencha o .env com suas credenciais reais

npx prisma db push      # cria as tabelas no banco
npm run db:seed         # popula dados de exemplo (clínica, profissionais, serviços)

npm run dev
```

Acesse:
- Site da clínica de exemplo: `http://localhost:3000/sorriso-bem-estar`
- Login admin: `admin@clinica.com` / `senha123`
- Login profissional: `ana@clinica.com` / `senha123`
- Login paciente: `paciente@teste.com` / `senha123`

Para testar pagamentos com Stripe localmente, use o Stripe CLI para
encaminhar os webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Deploy no Netlify

1. Suba este projeto para um repositório no GitHub.
2. No Netlify, clique em "Add new site → Import an existing project" e
   selecione o repositório.
3. O `netlify.toml` já está configurado com o plugin oficial do Next.js
   (`@netlify/plugin-nextjs`) — não precisa mexer no build command.
4. Em **Site settings → Environment variables**, cadastre todas as variáveis
   do `.env.example` com os valores reais de produção (incluindo
   `NEXTAUTH_URL` e `NEXT_PUBLIC_APP_URL` apontando para o domínio final do
   Netlify).
5. Rode `npx prisma db push` apontando para o banco de produção antes do
   primeiro deploy (pode ser feito localmente, só trocando o `DATABASE_URL`
   do `.env` temporariamente).
6. Configure o webhook do Stripe apontando para a URL final de produção.

## Como cadastrar uma nova clínica (novo tenant)

Hoje a criação de clínica/profissionais é feita via `prisma/seed.ts` ou
diretamente no banco (Prisma Studio: `npm run db:studio`). Para virar um SaaS
de auto-cadastro (onboarding sem intervenção manual), o próximo passo natural
é criar uma tela `/cadastro` que gera `Clinic` + `User` (`CLINIC_ADMIN`) via
uma API — a estrutura de dados já está pronta para isso, só falta a tela.

## Limitações conhecidas desta versão

- Envio de e-mail/WhatsApp de confirmação não está implementado (fácil de
  adicionar com Resend ou similar).
- Reembolsos e cancelamento de pagamento no Stripe não têm tela dedicada
  ainda (o registro fica como `PAID`/`REFUNDED` no banco, mas o estorno via
  Stripe precisa ser feito manualmente ou você implementa a chamada
  `stripe.refunds.create`).
- Onboarding de novas clínicas é manual (ver seção acima).
- Upload de anexos no prontuário (exames, imagens) está modelado no banco
  (`attachments: String[]`) mas a tela de upload ainda não foi construída.
