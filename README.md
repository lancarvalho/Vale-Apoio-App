# Vale Apoio - Plataforma de Financiamento Coletivo Eleitoral

Plataforma de arrecadação de recursos para campanhas eleitorais (Vaquinha Virtual), desenvolvida em conformidade com a Resolução TSE nº 23.607/2019.

## 🚀 Visão Geral

O **Vale Apoio** permite que pré-candidatos e candidatos arrecadem fundos de forma transparente, segura e auditável. A plataforma oferece painéis distintos para Candidatos, Doadores e Administradores, com geração automática de arquivos para prestação de contas (SPCE/TSE).

### Diferenciais Técnicos
*   **Compliance by Design:** Regras de negócio travadas conforme legislação eleitoral.
*   **Integração TSE:** Geração de arquivos `.FCC` (Layout v3.0) para importação no SPCE.
*   **Auditoria:** Logs imutáveis de ações críticas.
*   **UX Focada em Conversão:** Fluxo de pagamento otimizado e modal de adesão integrado.

## 🛠️ Tecnologias Utilizadas

*   **Frontend:** React 19, TypeScript, Tailwind CSS (via CDN para prototipagem rápida).
*   **Roteamento:** React Router Dom v6+.
*   **Ícones:** Lucide React.
*   **Gráficos:** Recharts.
*   **Infraestrutura (Prevista):** Google Cloud Platform / Firebase.

## 📦 Estrutura do Projeto

*   `/pages`: Telas da aplicação (Públicas, Dashboard Candidato, Admin).
*   `/components`: Componentes reutilizáveis (Header, Modais, Badges).
*   `/contexts`: Gerenciamento de estado global (Auth, Config, Maintenance).
*   `/utils`: Geradores de arquivos e helpers (TSE Generator).

## ⚙️ Configuração do Firebase

O projeto está preparado para integração com Firebase (Auth, Firestore e Storage).
Atualmente, a conexão está **desativada** (`firebase.ts` com linhas comentadas) para permitir o desenvolvimento offline/mockado sem travar a interface.

### Para reativar o Firebase:
1.  Crie um projeto no Console do Firebase.
2.  Habilite **Authentication**, **Firestore** e **Storage**.
3.  No arquivo `firebase.ts`:
    *   Descomente os imports no topo do arquivo.
    *   Preencha o objeto `firebaseConfig` com suas chaves.
    *   Descomente o bloco de inicialização.

## 🔒 Status do Projeto

Este projeto encontra-se em fase de **MVP (Minimum Viable Product)** e Homologação Visual. Os dados apresentados são fictícios (Mocks) para fins de demonstração de fluxo e usabilidade.

---
Desenvolvido para fortalecer a democracia através da tecnologia.