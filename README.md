# ⬡ AI Tabs

> Navegador multi-sessão para Claude, ChatGPT e Gemini — com perfis isolados, biblioteca de arquivos e injeção de uploads.

---

## ✨ Funcionalidades

- **Múltiplas abas isoladas** — cada aba tem seu próprio perfil de sessão, sem interferência entre contas
- **Suporte a Claude, ChatGPT e Gemini** — abre qualquer IA em abas separadas
- **Biblioteca de arquivos** — arraste arquivos para a biblioteca e anexe em qualquer aba com um clique
- **Injeção de uploads** — envia arquivos direto para o chat sem precisar usar o botão de anexar manualmente
- **Grupos de abas** — organize abas em grupos com nome e cor personalizados
- **Monitor de créditos** — detecta automaticamente quando o limite de mensagens do Claude é atingido e exibe countdown de reset
- **Bandeja do sistema** — minimiza para a bandeja em vez de fechar, sempre acessível
- **Interface personalizada** — titlebar e controles de janela nativos, tema escuro

---

## 🖥️ Plataformas

| Plataforma | Formato |
|---|---|
| Windows | Instalador `.exe` + Portable `.exe` |
| macOS | `.dmg` (Intel + Apple Silicon) |
| Linux | `.AppImage` · `.deb` · `.rpm` |

---

## 🚀 Instalação

### Windows
Baixe o `Claude Tabs Setup.exe` e execute. Ou use o `Claude Tabs.exe` portable sem instalar.

### macOS
Baixe o `.dmg`, abra e arraste para a pasta Aplicativos.
> Se aparecer aviso de "app não verificado", vá em **Preferências do Sistema → Segurança** e clique em "Abrir mesmo assim".

### Linux
```bash
# AppImage
chmod +x "Claude Tabs.AppImage"
./"Claude Tabs.AppImage"

# Debian/Ubuntu
sudo dpkg -i claude-tabs.deb

# Fedora/RHEL
sudo rpm -i claude-tabs.rpm
```

---

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm

### Rodar localmente
```bash
git clone https://github.com/seu-usuario/claude-tabs
cd claude-tabs
npm install
npm start
```

### Build manual

```bash
# Windows
npm run build:win

# macOS (requer macOS)
npm run build:mac

# Linux
npm run build:linux

# Todos (requer macOS para incluir Mac)
npm run build:all
```

Os arquivos gerados ficam em `/dist`.

---

## 📦 Estrutura do projeto

```
claude-tabs/
├── main.js          # Processo principal Electron
├── index.html       # UI + lógica do renderer
├── assets/
│   ├── icon.ico     # Ícone Windows
│   ├── icon.icns    # Ícone macOS
│   └── icon.png     # Ícone Linux
├── package.json
└── .github/
    └── workflows/
        └── build.yml  # CI/CD GitHub Actions
```

---

## 📎 Como usar a biblioteca de arquivos

1. Clique no ícone **📎** na barra de endereço para abrir o painel lateral
2. Arraste arquivos do seu computador para o painel
3. Selecione um ou mais arquivos e clique em **⬇ Anexar selecionados** — o arquivo será enviado automaticamente para o chat ativo
4. Ou arraste um arquivo do painel direto para a webview

### Plataformas suportadas para injeção de upload

| IA | Método |
|---|---|
| **Claude** | Injeta via `input[type="file"]` |
| **ChatGPT** | Injeta via `input[type="file"]` já presente no DOM |
| **Gemini** | Abre menu de upload → injeta via observer do input dinâmico |

---

## ⌨️ Atalhos

| Atalho | Ação |
|---|---|
| `Ctrl+T` | Nova aba |
| `Ctrl+W` | Fechar aba ativa |
| `Ctrl+Tab` | Próxima aba |
| `Ctrl+1` a `Ctrl+9` | Ir para aba N |

---

## 🤖 CI/CD

O projeto usa GitHub Actions para build automático em todas as plataformas.

Para lançar uma nova versão:

```bash
git tag v1.2.0
git push origin v1.2.0
```

O workflow vai compilar para Windows, Linux e macOS em paralelo e criar um Release no GitHub com todos os instaladores.

---

## 📄 Licença

MIT
