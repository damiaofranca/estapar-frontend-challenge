# Frontend Challenge — Estapar

Teste técnico de front-end para o portal B2B de gestão de garagens, vagas e planos de mensalista digital.

- **Protótipo (Figma Figma)**  
  https://www.figma.com/board/CdIGvRXNpxcPyJIze4hYRE/Teste-Front?t=YU8tn1L6rJayH1K8-0

- **API (documentação)**  
  https://c6wu4yjlku.apidog.io

- **Repositório do desafio**  
  https://github.com/estapar/frontend-challenge

- **Link da aplicação**  
  https://estapar-frontend-challenge.vercel.app/

- **Credenciais de exemplo (mock)**  
  usuário `estapar` · senha `@estapar@`


Configure a URL base da API em variável de ambiente **`VITE_API_URL`** (ex.: mock Apidog), conforme o ambiente onde o projeto será executado. Arquivo de exemplo em **`.env.example`**.

---

# Avisos para quem revisa o projeto

Os dois pontos abaixo **não são detalhes secundários**: explicam por que a tela pode diferir do Figma e por que os tipos/`GET` podem não espelhar o Apidog literalmente.

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
yarn test:e2e  # testes end-to-end (Playwright — ver secção abaixo)
```

---

## Testes E2E (Playwright)

Os testes vivem na pasta **`e2e/`**, com **Page Object Model** em **`e2e/pages/`**, mocks de API em **`e2e/fixtures/`** e specs em **`e2e/*.spec.ts`**. A API é simulada com `page.route()`; o `VITE_API_URL` usado no bundle de teste aponta para um host fictício definido no `playwright.config.ts`.

**Primeira vez na máquina** (baixar o Chromium do Playwright):

```bash
node node_modules/@playwright/test/cli.js install chromium
```

**Rodar a suíte:**

```bash
yarn test:e2e
```

**Relatório HTML** (após uma execução):

```bash
npx playwright show-report
```

**Servidor nos testes:** o Playwright sobe **`vite preview`** em `http://127.0.0.1:4173`. Se já existir **`dist/index.html`**, usa só o preview (ciclo local mais rápido). Em **CI** ou se **`PLAYWRIGHT_FORCE_BUILD=1`**, executa sempre `yarn build` antes do preview. Para forçar rebuild local (código ou `VITE_API_URL` mudaram):

```powershell
$env:PLAYWRIGHT_FORCE_BUILD="1"; yarn test:e2e
```

Artefactos de execução (`playwright-report/`, `test-results/`, `last-results/`) estão no **`.gitignore`**.

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
| **E2E** | Playwright (`@playwright/test`) | Fluxos críticos, validações, navegação e APIs mockadas; ver secção **Testes E2E**. |

**Organização:** serviços em `src/services` (axios + wrappers), hooks finos em `src/hooks`, páginas em `src/pages`, componentes UI reutilizáveis em `src/components/ui`.

### Justificativa de algumas escolhas técnicas

#### Ícones (SVG próprio em vez de biblioteca de ícones)

Considerei usar uma **lib de ícones** (ex.: pacote com park-icons). Como o referencial no Figma **não permitia pixel-perfect**, sobretudo por ser muito conteúdo em **imagem**, tratei um dos eixos ao meu favor: **fidelidade visual dos pictogramas**. Ícones em **SVG inline** no repositório permitem ajustar **stroke, viewBox e proporção** à mão para ficarem próximos do que aparece nos mockups, sem herdar o peso visual “genérico” de um set de biblioteca que não foi desenhado para aquele layout.

Num **cenário de produto** com design system fechado (tokens + biblioteca de ícones oficial), a tendência seria **adotar a lib acordada com design** e trocar estes SVG por imports desse pacote, mantendo a mesma arquitetura de componentes.

#### Componentes UI (sem lib de componentes pronta estilo shadcn/MUI)

Não integrei uma **UI kit completa** (Material, Ant, Chakra, shadcn em cima de Radix, etc.). A maior parte dessas soluções vem com **presets fortes** (tema, densidade, animações, estilos de foco) que competem com o que o desafio pede em Tailwind e com o **protótipo em imagem**: ou se gasta tempo a **sobrescrever** tokens e estilos da lib, ou a interface **deriva** do look do Figma.

Uma alternativa seria uma camada **headless** (só comportamento e acessibilidade, estilo 100% teu). Para o **escopo e prazo** de um teste técnico, isso **aumenta complexidade e tempo** (composição de primitivos, estados, ARIA, focus trap em modal/drawer, etc.) sem ganho proporcional frente a **componentes próprios enxutos** em `src/components/ui` (botão, input, tabela, modal, drawer já integrado com `rc-drawer` onde fazia sentido).

Em suma: **componentes leves feitos para o projeto** + Tailwind; num time maior, faria sentido evoluir para **headless + tokens** ou para a **lib oficial** da empresa, com migração gradual.

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
| `yarn preview` | Servir o conteúdo de `dist/` (mesmo modo usado pelos E2E). |
| `yarn test:e2e` | Playwright: sobe preview (e build se necessário) e corre todos os testes em `e2e/`. |
| `yarn lint` | ESLint (inclui Prettier integrado na configuração do projeto). |
| `yarn format:check` | Verificação Prettier em arquivos fonte. |

## Utilização de IA

O **Cursor** foi utilizado ao longo do desenvolvimento como ferramenta de apoio em diferentes frentes, sempre com revisão humana antes de cada commit

**Como a IA foi aplicada no fluxo:**

| Frente | Uso |
| :--- | :--- |
| **Padronização de código** | Reforço de convenções (nomes, tipos, organização de pastas, early returns, classes Tailwind) e checagem de aderência às regras do projeto. |
| **Documentação** | Apoio na escrita e estruturação deste `README.md`, comentários pontuais e mensagens de commit no padrão Conventional Commits. |
| **Pair coding** | Discussão de abordagens, geração de boilerplate (services, hooks, schemas Zod, componentes UI) e refino iterativo de implementações. |
| **Revisão e refatoração** | Sugestões de melhorias de legibilidade, extração de componentes/hooks e identificação de duplicação. |
| **Depuração** | Auxílio na leitura de stack traces, hipóteses de causa raiz e validação de fixes. |

**O que permaneceu sob responsabilidade humana:** decisões de arquitetura, escolha de bibliotecas, modelagem de dados, validação contra a API real e aprovação final de todo código antes do commit.
