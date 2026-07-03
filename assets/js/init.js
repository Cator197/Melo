document.addEventListener('DOMContentLoaded', () => {
  const page = window.MeloNavigation.findPage();
  document.title = `Melo Reparos — ${page.label}`;
  document.querySelectorAll('[data-current-title]').forEach((el) => { el.textContent = page.label; });
  document.querySelectorAll('[data-current-module]').forEach((el) => { el.textContent = page.module; });
  window.MeloNavigation.renderSidebar();
  window.MeloNavigation.bindNavigation();
  window.MeloPages.render();
  window.MeloComponents.bindComponents();
});
