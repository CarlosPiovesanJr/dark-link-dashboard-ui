
# LinkBoard UI

Um dashboard moderno e personalizável para organizar seus links e ferramentas favoritas, construído com React, TypeScript e Aceternity UI.

## 🚀 Características

- **Dashboard Responsivo**: Interface moderna e responsiva que funciona em todos os dispositivos
- **Tema Dark/Light**: Sistema completo de temas com switcher integrado
- **Links Personalizados**: Adicione, edite e organize seus links favoritos
- **Links Fixos do Sistema**: Links administrativos gerenciáveis pelo painel admin
- **Autenticação Supabase**: Sistema de login/registro seguro
- **Painel Administrativo**: Interface completa para gerenciar links fixos e configurações
- **Animações Fluidas**: Transições suaves com Framer Motion
- **Validação de Formulários**: Validação robusta com React Hook Form e Zod

## 🛠️ Tecnologias

- **Frontend**: React 18, TypeScript, Vite
- **Estilização**: Tailwind CSS, Aceternity UI
- **Animações**: Framer Motion
- **Formulários**: React Hook Form, Zod
- **Backend**: Supabase (Auth + Database)
- **Roteamento**: React Router DOM
- **Estado**: TanStack Query
- **Ícones**: Lucide React

## 🎨 Design System

O LinkBoard UI utiliza um design system personalizado com:

- **Cores Primárias**: Tons de laranja e azul suave
- **Tema**: Dark mode por padrão com suporte a light mode
- **Tipografia**: Sistema hierárquico otimizado para legibilidade
- **Componentes**: Biblioteca customizada baseada em Aceternity UI
- **Responsividade**: Mobile-first com breakpoints bem definidos

## 📱 Funcionalidades

### Para Usuários
- ✅ Dashboard personalizado com links organizados
- ✅ Adicionar/editar/remover links pessoais
- ✅ Categorização de links
- ✅ Busca e filtros
- ✅ Tema claro/escuro
- ✅ Interface responsiva

### Para Administradores
- ✅ Painel administrativo protegido
- ✅ Gerenciamento de links fixos do sistema
- ✅ CRUD completo para links
- ✅ Validação de formulários
- ✅ Estatísticas e métricas

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+ 
- NPM ou Yarn
- Conta Supabase (para autenticação e database)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/linkboard-ui.git
cd linkboard-ui
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Configure suas credenciais do Supabase
VITE_SUPABASE_URL=sua-url-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

4. Execute o projeto:
```bash
npm run dev
```

5. Acesse `http://localhost:5173`

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Constrói o projeto para produção
npm run preview      # Preview da build de produção
npm run lint         # Executa o linter
npm run type-check   # Verifica tipos TypeScript
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── common/          # Componentes compartilhados (ThemeProvider, etc)
│   ├── admin/           # Componentes administrativos
│   └── ui/              # Componentes base da UI
├── pages/
│   ├── admin/           # Páginas administrativas
│   ├── user/            # Páginas do usuário
│   └── ...              # Outras páginas
├── hooks/               # Custom hooks
├── styles/              # Configurações de tema e estilos
├── lib/                 # Utilitários e configurações
└── integrations/        # Integrações externas (Supabase)
```

## 🔧 Configuração do Supabase

### Tabelas Necessárias

```sql
-- Tabela de shortcuts/links pessoais
CREATE TABLE shortcuts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS (Row Level Security)
ALTER TABLE shortcuts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own shortcuts" ON shortcuts
  FOR ALL USING (auth.uid() = user_id);
```

### Configuração de Autenticação

1. No painel do Supabase, vá em Authentication > Settings
2. Configure as URLs de redirecionamento
3. Ative os provedores de autenticação desejados

## 🎯 Roadmap

- [ ] Importação/exportação de links
- [ ] Compartilhamento de coleções
- [ ] Integração com marcadores do navegador
- [ ] API pública para integrações
- [ ] Métricas avançadas de uso
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Temas personalizáveis

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por [Carlos Piovesan Jr](https://github.com/carlospiovesanjr)

## 🙏 Agradecimentos

- [Aceternity UI](https://ui.aceternity.com/) pelos componentes base
- [Supabase](https://supabase.com/) pela infraestrutura backend
- [Tailwind CSS](https://tailwindcss.com/) pelo sistema de design
- [Framer Motion](https://www.framer.com/motion/) pelas animações

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
