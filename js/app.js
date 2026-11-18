'use strict';

// Dados de exemplo para o protótipo acadêmico: sem API, login ou banco de dados.
const receitas = [
  { id: 1, nome: 'Omelete com queijo', categoria: 'Café da manhã', tempo: 10, emoji: '🍳', cor: 'beige', ingredientes: ['2 ovos', '2 colheres de queijo ralado', '1 pitada de sal', '1 fio de óleo'], passos: ['Bata os ovos com o sal.', 'Aqueça uma frigideira com óleo e coloque os ovos.', 'Acrescente o queijo, dobre e cozinhe até firmar.'] },
  { id: 2, nome: 'Macarrão alho e óleo', categoria: 'Almoço', tempo: 20, emoji: '🍝', cor: 'pink', ingredientes: ['200 g de macarrão', '2 dentes de alho', '2 colheres de óleo', 'Sal a gosto'], passos: ['Cozinhe o macarrão conforme as instruções da embalagem.', 'Doure o alho picado no óleo, em fogo baixo.', 'Misture o macarrão escorrido ao alho e sirva.'] },
  { id: 3, nome: 'Vitamina de banana', categoria: 'Bebida', tempo: 5, emoji: '🥤', cor: 'purple', ingredientes: ['2 bananas', '1 copo de leite ou bebida vegetal', 'Canela a gosto'], passos: ['Descasque e corte as bananas.', 'Bata com o leite ou bebida vegetal no liquidificador.', 'Acrescente canela, se desejar, e sirva.'] },
  { id: 4, nome: 'Panqueca simples', categoria: 'Café da manhã', tempo: 15, emoji: '🥞', cor: 'beige', ingredientes: ['1 ovo', '1 xícara de leite', '1 xícara de farinha de trigo', '1 pitada de sal'], passos: ['Misture todos os ingredientes até formar uma massa lisa.', 'Despeje porções pequenas em uma frigideira levemente untada.', 'Doure dos dois lados e sirva com o recheio de sua preferência.'] },
  { id: 5, nome: 'Salada colorida', categoria: 'Almoço', tempo: 10, emoji: '🥗', cor: 'green', ingredientes: ['2 folhas de alface', '1 tomate', '1 cenoura', 'Limão e sal a gosto'], passos: ['Lave e higienize adequadamente os vegetais.', 'Corte a alface, o tomate e rale a cenoura.', 'Misture e tempere na hora de servir.'] },
  { id: 6, nome: 'Sanduíche natural', categoria: 'Lanche', tempo: 10, emoji: '🥪', cor: 'green', ingredientes: ['2 fatias de pão', '2 folhas de alface', '2 rodelas de tomate', '2 colheres de requeijão'], passos: ['Lave e higienize os vegetais.', 'Passe requeijão nas fatias de pão.', 'Monte o sanduíche com alface e tomate.'] },
  { id: 7, nome: 'Bolo de caneca', categoria: 'Sobremesa', tempo: 5, emoji: '🧁', cor: 'pink', ingredientes: ['1 ovo', '3 colheres de leite', '2 colheres de açúcar', '3 colheres de farinha', '1 colher de chocolate em pó', '1/2 colher de fermento'], passos: ['Misture tudo em uma caneca grande própria para micro-ondas.', 'Leve ao micro-ondas por cerca de 1 minuto e 30 segundos; ajuste conforme a potência.', 'Deixe amornar e verifique o cozimento antes de consumir.'] },
  { id: 8, nome: 'Tapioca com queijo', categoria: 'Lanche', tempo: 8, emoji: '🫓', cor: 'beige', ingredientes: ['3 colheres de goma de tapioca hidratada', '2 fatias de queijo', '1 pitada de sal'], passos: ['Espalhe a goma em uma frigideira aquecida.', 'Espere firmar, coloque o queijo e dobre ao meio.', 'Aqueça até o queijo derreter.'] },
  { id: 9, nome: 'Arroz com legumes', categoria: 'Almoço', tempo: 30, emoji: '🍚', cor: 'green', ingredientes: ['1 xícara de arroz', '1/2 cenoura', '1/2 tomate', '2 xícaras de água', 'Sal e óleo a gosto'], passos: ['Lave, descasque e corte os legumes conforme necessário.', 'Refogue o arroz e os legumes com um pouco de óleo.', 'Coloque a água e o sal e cozinhe até a água secar e o arroz ficar macio.'] }
];

const $ = (seletor) => document.querySelector(seletor);
const lista = $('#lista-receitas');
const busca = $('#busca');
const categoria = $('#categoria');
const somenteFavoritas = $('#somente-favoritas');
const dialogo = $('#detalhes');
let toastTimer;
let favoritos = new Set();
try {
  const salvos = JSON.parse(localStorage.getItem('receita-facil-favoritos') || '[]');
  if (Array.isArray(salvos)) favoritos = new Set(salvos.filter(id => Number.isInteger(id)));
} catch { favoritos = new Set(); }

const normalizar = (texto) => String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function filtrarReceitas() {
  const termo = normalizar(busca.value.trim());
  return receitas.filter((receita) => {
    const combinaTexto = !termo || normalizar([receita.nome, ...receita.ingredientes].join(' ')).includes(termo);
    return combinaTexto && (categoria.value === 'todas' || receita.categoria === categoria.value) && (!somenteFavoritas.checked || favoritos.has(receita.id));
  });
}

function criarCartao(receita) {
  const artigo = document.createElement('article');
  artigo.className = 'recipe-card';
  artigo.innerHTML = `
    <div class="recipe-visual" data-color="${receita.cor}" aria-hidden="true">${receita.emoji}</div>
    <div class="card-body">
      <div class="card-meta"><span>${receita.categoria}</span><span>⏱ ${receita.tempo} min</span></div>
      <h3>${receita.nome}</h3>
      <p>${receita.ingredientes.slice(0, 3).join(' · ')}...</p>
      <div class="card-actions"><button type="button" class="button button-secondary" data-ver="${receita.id}">Ver receita</button>
      <button type="button" class="favorite ${favoritos.has(receita.id) ? 'is-favorite' : ''}" data-favorito="${receita.id}" aria-label="${favoritos.has(receita.id) ? 'Remover dos' : 'Adicionar aos'} favoritos: ${receita.nome}" aria-pressed="${favoritos.has(receita.id)}">${favoritos.has(receita.id) ? '♥' : '♡'}</button></div>
    </div>`;
  return artigo;
}

function renderizar() {
  const resultado = filtrarReceitas();
  lista.replaceChildren(...resultado.map(criarCartao));
  $('#contador').textContent = `${resultado.length} ${resultado.length === 1 ? 'receita encontrada' : 'receitas encontradas'}`;
  $('#vazio').hidden = resultado.length !== 0;
}

function aviso(mensagem) {
  const elemento = $('#aviso');
  elemento.textContent = mensagem;
  elemento.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elemento.classList.remove('show'), 3300);
}

function alternarFavorito(id) {
  if (favoritos.has(id)) favoritos.delete(id); else favoritos.add(id);
  try { localStorage.setItem('receita-facil-favoritos', JSON.stringify([...favoritos])); }
  catch { aviso('Não foi possível salvar os favoritos neste navegador.'); }
  renderizar();
}

function criarLista(itens, ordenada = false) {
  const elemento = document.createElement(ordenada ? 'ol' : 'ul');
  itens.forEach((texto) => { const li = document.createElement('li'); li.textContent = texto; elemento.append(li); });
  return elemento;
}

function abrirReceita(id) {
  const receita = receitas.find(item => item.id === id);
  if (!receita) return;
  const conteudo = $('#conteudo-receita');
  conteudo.replaceChildren();
  const cabecalho = document.createElement('div');
  cabecalho.className = 'modal-title';
  const icone = document.createElement('span'); icone.className = 'emoji'; icone.textContent = receita.emoji;
  const dados = document.createElement('div');
  const titulo = document.createElement('h2'); titulo.id = 'modal-titulo'; titulo.textContent = receita.nome;
  const subtitulo = document.createElement('p'); subtitulo.textContent = `${receita.categoria} · ${receita.tempo} minutos`;
  dados.append(titulo, subtitulo); cabecalho.append(icone, dados); conteudo.append(cabecalho);
  for (const [nome, itens, ordenada] of [['Ingredientes', receita.ingredientes, false], ['Modo de preparo', receita.passos, true]]) {
    const h3 = document.createElement('h3'); h3.textContent = nome;
    conteudo.append(h3, criarLista(itens, ordenada));
  }
  const rodape = document.createElement('div'); rodape.className = 'modal-footer';
  const compartilhar = document.createElement('button'); compartilhar.type = 'button'; compartilhar.className = 'button button-primary'; compartilhar.textContent = '↗ Compartilhar receita';
  compartilhar.addEventListener('click', () => compartilharReceita(receita));
  rodape.append(compartilhar); conteudo.append(rodape);
  if (typeof dialogo.showModal === 'function') dialogo.showModal(); else dialogo.setAttribute('open', '');
}

async function compartilharReceita(receita) {
  const texto = `${receita.nome}\nIngredientes: ${receita.ingredientes.join(', ')}\nPreparo:\n${receita.passos.map((p, i) => `${i + 1}. ${p}`).join('\n')}\nReceita Fácil`;
  if (navigator.share) {
    try { await navigator.share({ title: receita.nome, text: texto }); return; }
    catch (erro) { if (erro.name === 'AbortError') return; }
  }
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(texto);
    else {
      const area = document.createElement('textarea');
      area.value = texto; area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.append(area); area.select();
      if (!document.execCommand('copy')) throw new Error('Falha ao copiar');
      area.remove();
    }
    aviso('Receita copiada! Você pode colar e compartilhar.');
  } catch { aviso('Não foi possível compartilhar nesta configuração do navegador.'); }
}

busca.addEventListener('input', renderizar);
categoria.addEventListener('change', renderizar);
somenteFavoritas.addEventListener('change', renderizar);
$('#limpar').addEventListener('click', () => { busca.value = ''; categoria.value = 'todas'; somenteFavoritas.checked = false; renderizar(); busca.focus(); });
lista.addEventListener('click', (evento) => {
  const ver = evento.target.closest('[data-ver]');
  const favorito = evento.target.closest('[data-favorito]');
  if (ver) abrirReceita(Number(ver.dataset.ver));
  if (favorito) alternarFavorito(Number(favorito.dataset.favorito));
});
$('#fechar').addEventListener('click', () => { if (dialogo.close) dialogo.close(); else dialogo.removeAttribute('open'); });
dialogo.addEventListener('click', (evento) => { if (evento.target === dialogo) dialogo.close(); });
renderizar();
