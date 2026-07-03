# Engethermo Engenharia — Site

Site institucional da Engethermo Engenharia. Stack: **React + Vite** (frontend), **Vercel Functions** (API), **Google Gemini** (chat de IA). Sem backend próprio, sem banco de dados.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. O chat de IA não funciona no `npm run dev` puro (ele depende da função serverless `api/chat.ts`). Para testar com a API local, use a CLI da Vercel:

```bash
npm i -g vercel
vercel dev
```

## Variável de ambiente

Copie `.env.example` para `.env` e preencha:

```
GEMINI_API_KEY=sua-chave-do-google-ai-studio
```

Gere a chave gratuitamente em https://aistudio.google.com/app/apikey

## Deploy

Configurado para deploy automático na Vercel a partir do GitHub (`vercel.json` já define o build). Basta importar o repositório no [vercel.com](https://vercel.com) e adicionar a variável `GEMINI_API_KEY` nas Environment Variables do projeto.

## Estrutura

```
client/          # Frontend React (páginas, componentes)
client/public/images/  # Imagens do site (antes hospedadas no Manus)
api/chat.ts      # Função serverless que responde o chat de IA via Gemini
```
