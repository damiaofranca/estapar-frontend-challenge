# Frontend Challenge — Estapar

Teste técnico de front-end para o portal B2B de gestão de garagens, vagas e planos de mensalista digital.

- **Protótipo (Figma FigJam)**  
  https://www.figma.com/board/CdIGvRXNpxcPyJIze4hYRE/Teste-Front?t=YU8tn1L6rJayH1K8-0

- **API (documentação)**  
  https://c6wu4yjlku.apidog.io

- **Credenciais de exemplo (mock)**  
  usuário `estapar` · senha `@estapar@`

Configure a URL base da API em variável de ambiente **`VITE_API_URL`** (ex.: mock Apidog), conforme o ambiente onde o projeto será executado.

---

# Avisos para quem revisa o projeto

Os dois pontos abaixo **não são detalhes secundários**: explicam por que a tela pode diferir do FigJam e por que os tipos/`GET` podem não espelhar o Apidog literalmente.

---

## 1) Figma — fidelidade visual (por que não está “pixel-perfect”)

| | |
| :--- | :--- |
| **O quê** | O board de referência usa **muito conteúdo em imagem** (raster, mockups compostos), não só texto e vetores editáveis no inspetor. |
| **Impacto** | Não dá para extrair com confiança **tamanhos exatos**, **pesos de fonte**, **entrelinha**, **raios** ou **espaçamentos** como se fossem specs de um design system. |
| **O que foi feito** | A UI é uma **reinterpretação próxima** à hierarquia e ao look do protótipo, com **tokens** (`@theme` em `src/index.css`) e **Tailwind** para escala e responsivo. |
| **Como melhorar** | Se houver **library com tokens**, **textos selecionáveis** ou **componentes em vetor**, a fidelidade pode ser refinada sem mudar a arquitetura do app. |

---

## 2) API — respostas `GET` e documentação Apidog (tipos e interceptor)

| | |
| :--- | :--- |
| **O quê** | Na integração real (mock ou ambiente), os **`GET`** devolveram corpo com **nomes e tipos diferentes** do schema publicado no Apidog em alguns pontos. |
| **Exemplos típicos** | `string` vs `number`; nomes de propriedades distintos do que a doc lista; envelope com `data` vs payload “direto”. |
| **Impacto** | Os **tipos TypeScript** em `src/services/...` e o que o cliente enxerga após o **`response` passar pelo Axios** (`src/lib/axios.ts` — interceptor que expõe `response.data`) foram **calibrados pelo que de fato volta na rede**, não só pelo YAML do Apidog. |
| **O que esperar** | Pequenas divergências entre **README / tipos / código** e a doc oficial **até o contrato ser alinhado** no backend ou na documentação. |

**Onde olhar no código:** `src/lib/axios.ts`, `src/services/garages/`, `src/services/plans/`, `src/services/auth/`.

---

## Como executar

```bash
yarn install   # ou npm install / pnpm install
yarn dev       # servidor de desenvolvimento
yarn build     # build de produção
yarn lint      # ESLint + Prettier
yarn preview   # pré-visualização do build
```

---

## Stack e decisões técnicas

| Área | Escolha | Motivação breve |
|------|---------|-----------------|
| **App** | React 19 + TypeScript | Tipagem forte, ecossistema maduro para formulários e tabelas. |
| **Build** | Vite 8 | HMR rápido e bundle enxuto. |
| **Estilo** | Tailwind CSS 4 + tema em `@theme` (`src/index.css`) | Tokens de cor/texto alinhados à identidade Estapar evitadas em CSS espalhado. |
| **Roteamento** | React Router 7 (`createBrowserRouter`) | Rotas protegidas, layout autenticado e lazy loading de páginas. |
| **Dados remotos** | TanStack Query (React Query) + Axios | Cache, estado de loading/erro e invalidação após mutations. |
| **Autenticação** | JWT em `Bearer` · Zustand + `persist` | Token e usuário disponíveis após hidratação; decode opcional para `name`/`sub`. |
| **Formulários** | React Hook Form + Zod + `@hookform/resolvers` | Validação declarativa e feedback de erro por campo. |
| **Drawer** | `rc-drawer` | Comportamento de painel lateral com overlay, usado nos detalhes da garagem. |
| **Feedback** | react-toastify | Toasts globais para sucesso/erro de API após criar/atualizar plano. |

**Organização:** serviços em `src/services` (axios + wrappers), hooks finos em `src/hooks`, páginas em `src/pages`, componentes UI reutilizáveis em `src/components/ui`.

---

## História do projeto e cobertura

### 1) Garagens para mensalistas digitais (Roberto Freitas)

- Lista com **código**, **nome**, **endereço**, **cidade/UF**, **regional**.
- Busca por **nome** da garagem com debounce, integrada ao endpoint paginado.
- Botão **visualizar** abre um **drawer** com dados do estacionamento selecionado.
- Header mostra **nome do usuário** (prioridade: claims do JWT quando existentes; caso contrário usuário digitado no login; fallback textual genérico).
- **Switch "Mensalista Digital":** A documentação atual de **`GET /GetGaragesPaginatedList`** não expõe parâmetro específico para esse filtro. Enquanto a API não oferecer o campo/payload, o switch atua como **controle de escopo no cliente**: ligado mantém o carregamento da lista conforme escopo esperado (“garagens para mensalista digital”); desligado desabilita a query e orienta na interface a reativar o filtro para ver as garagens desse fluxo — evitando requisição e mantendo consistência quando o backend passar a suportar um parâmetro real.

### 2) Vagas e planos (Pedro — detalhes no drawer)

- Cabeçalho com nome, código, endereço, filial/regional quando retornados pelo `GET /garage`.
- **Total**, **ocupadas** e **disponíveis** derivados dos campos da API.
- Tabela de planos com colunas solicitadas (**descrição, valor em BRL a partir dos centavos, vagas, ocupadas/disponíveis quando a API enviar ocupação**, status, edição via modal).
- **Atualização manual** dos dados do estacionamento e da lista de planos via ação explícita de atualizar dentro do drawer (invalidação das queries relacionadas).

### 3) Cadastro e edição de plano

- Modal com campos obrigatórios, validação (datas coerentes, valores em centavos, vagas inteiras positivas etc.).
- Criar/atualizar via API; mensagens de sucesso/erro via toast conforme resultado.
- Alteração **ativo/inativo** no formulário por switch; atualização rápida de status apenas na edição preservando o mesmo fluxo de salvar quando necessário pela API disponível na documentação.

---

## Contrato da API — detalhes adicionais

- Os payloads de **planos** seguem nomes herdados da especificação (ex.: `veichleType`, `amountDailyCacellationInCents` — grafia conforme backend).
- Lista de garagens está alinhada ao schema **GaragePaginatedList** / **GarageItemList** descrito na Apidog, sujeita às ressalvas da seção **«2) API — respostas GET»** no topo deste README.
- Ajustes finos entre mock e backend real ficam nos tipos (`src/services/...`) e na camada que monta payloads.

---

## Scripts úteis

| Comando | Descrição |
|---------|-----------|
| `yarn dev` | Desenvolvimento com Vite. |
| `yarn build` | `tsc -b` + bundle de produção. |
| `yarn lint` | ESLint (inclui Prettier integrado na configuração do projeto). |
| `yarn format:check` | Verificação Prettier em arquivos fonte. |

