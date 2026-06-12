window.MeloNavigation = (() => {
  const navItems = [
    { label: 'Início', icon: '⌂', href: 'inicio.html', module: 'Painel' },
    { label: 'Ordens de Serviço', icon: '▣', href: 'ordens-servico.html', module: 'Operação' },
    { label: 'Produção', icon: '▦', href: 'producao.html', module: 'Operação' },
    { label: 'Agenda', icon: '◷', href: 'agenda.html', module: 'Operação' },
    { label: 'Complementos', icon: '+', href: 'complementos.html', module: 'Operação' },
    { label: 'Compras', icon: '◫', href: 'compras.html', module: 'Suprimentos' },
    { label: 'Financeiro', icon: '$', children: [
      { label: 'Visão geral', href: 'financeiro-visao-geral.html', module: 'Financeiro' },
      { label: 'Contas a receber', href: 'contas-receber.html', module: 'Financeiro' },
      { label: 'Contas a pagar', href: 'contas-pagar.html', module: 'Financeiro' },
      { label: 'Fluxo de caixa', href: 'fluxo-caixa.html', module: 'Financeiro' }
    ]},
    { label: 'Relatórios', icon: '◰', href: 'relatorios.html', module: 'Gestão' },
    { label: 'Cadastros', icon: '☷', children: [
      { label: 'Clientes', href: 'clientes.html', module: 'Cadastros' },
      { label: 'Veículos', href: 'veiculos.html', module: 'Cadastros' },
      { label: 'Fornecedores', href: 'fornecedores.html', module: 'Cadastros' },
      { label: 'Usuários', href: 'usuarios.html', module: 'Cadastros' }
    ]},
    { label: 'Importações', icon: '⇪', href: 'importacoes.html', module: 'Ferramentas' },
    { label: 'Configurações', icon: '⚙', href: 'configuracoes.html', module: 'Sistema' }
  ];

  function currentFile() {
    const file = window.location.pathname.split('/').pop() || 'inicio.html';
    return file === 'index.html' ? 'inicio.html' : file;
  }

  function findPage(file = currentFile()) {
    for (const item of navItems) {
      if (item.href === file) return item;
      if (item.children) {
        const child = item.children.find((sub) => sub.href === file);
        if (child) return { ...child, parent: item.label };
      }
    }
    if (file === 'ordem-servico-detalhes.html') return { label: 'Detalhes da OS', module: 'Operação' };
    if (file === 'componentes.html') return { label: 'Componentes', module: 'Validação visual' };
    return { label: 'Protótipo', module: 'Melo Reparos' };
  }

  function renderSidebar() {
    const sidebar = document.querySelector('[data-sidebar-nav]');
    if (!sidebar) return;
    const activeFile = currentFile();
    sidebar.innerHTML = navItems.map((item) => {
      if (!item.children) return navLink(item, activeFile);
      const open = item.children.some((sub) => sub.href === activeFile);
      return `<div class="nav-group ${open ? 'is-open' : ''}">
        <button class="nav-parent" type="button" data-nav-parent>
          <span class="nav-icon">${item.icon}</span><span class="nav-label">${item.label}</span><span class="nav-chevron">▶</span>
        </button>
        <div class="nav-submenu">${item.children.map((sub) => navLink(sub, activeFile)).join('')}</div>
      </div>`;
    }).join('');
  }

  function navLink(item, activeFile) {
    const isActive = item.href === activeFile;
    const icon = item.icon ? `<span class="nav-icon">${item.icon}</span>` : '';
    return `<a class="nav-link ${isActive ? 'active' : ''}" href="${item.href}" data-page-link="${item.href}">${icon}<span class="nav-label">${item.label}</span></a>`;
  }

  function bindNavigation() {
    document.querySelectorAll('[data-nav-parent]').forEach((button) => {
      button.addEventListener('click', () => button.closest('.nav-group').classList.toggle('is-open'));
    });
    document.querySelectorAll('[data-menu-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 900px)').matches) document.body.classList.toggle('mobile-nav-open');
        else document.body.classList.toggle('sidebar-collapsed');
      });
    });
    document.querySelector('[data-mobile-backdrop]')?.addEventListener('click', () => document.body.classList.remove('mobile-nav-open'));
    document.querySelectorAll('[data-page-link]').forEach((link) => link.addEventListener('click', () => document.body.classList.remove('mobile-nav-open')));
  }

  return { navItems, renderSidebar, bindNavigation, findPage, currentFile };
})();
