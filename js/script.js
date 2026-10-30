// Painel de pré-visualização: diz ao painel em que página estamos
// e repõe a posição do scroll depois de cada atualização
if (window.parent !== window) {
    const pagina = location.pathname.split('/').pop() || 'index.html';
    window.parent.postMessage({ tipo: 'pagina', nome: pagina }, '*');

    window.addEventListener('scroll', () => {
        window.parent.postMessage({ tipo: 'scroll', y: window.scrollY }, '*');
    }, { passive: true });

    window.addEventListener('message', e => {
        if (e.data && e.data.tipo === 'repor') {
            window.scrollTo({ top: e.data.y, behavior: 'instant' });
        }
    });
}
