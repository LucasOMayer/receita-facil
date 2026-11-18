# Receita Fácil 🍳

Protótipo acadêmico de uma aplicação web responsiva para a disciplina **Introdução ao Desenvolvimento para Dispositivos Móveis**, ministrada pelo professor **Romário Vitorino Ferreira**.

## Integrantes

- **Lucas de Oliveira Mayer**
- **Vandesson Fonseca do Espirito Santo**

## Problema e público-alvo

Muitas pessoas têm ingredientes em casa, mas não sabem quais receitas simples podem preparar com eles. A aplicação é destinada a estudantes, iniciantes na cozinha e pessoas que desejam ideias práticas para refeições do dia a dia.

## Objetivo

Ajudar o usuário a encontrar receitas acessíveis a partir do nome do prato ou de ingredientes disponíveis, utilizando uma interface que funcione em celulares e computadores.

## Funcionalidades disponíveis (protótipo inicial)

- Mostrar 9 receitas de exemplo, com ingredientes, preparo e tempo estimado.
- Pesquisar receitas por nome ou ingrediente (sem diferenciar acentos e letras maiúsculas).
- Filtrar receitas por categoria.
- Ordenar as receitas por menor tempo, maior tempo ou nome (A–Z), combinando com os filtros.
- Visualizar ingredientes e modo de preparo.
- Marcar receitas como favoritas (salvas localmente no navegador).
- Compartilhar uma receita usando a **API de Compartilhamento Web** (`navigator.share`) quando disponível; caso contrário, tentar copiá-la para a **área de transferência**.
- Interface responsiva para celular e computador.

## Recursos do dispositivo ou navegador

Compartilhamento nativo e área de transferência, mediante disponibilidade e permissões do navegador. Favoritos com `localStorage`.

## Tecnologias

**HTML5, CSS3 e JavaScript puro**, sem bibliotecas e sem necessidade de servidor, conta ou chave de API.

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` em um navegador moderno.
3. Pesquise uma receita, abra o preparo, marque favoritos e experimente compartilhar.

> Nota: o compartilhamento nativo e a API moderna da área de transferência podem precisar de HTTPS ou `localhost`. Sem essas condições, o sistema tenta um método alternativo de cópia.

## Organização de arquivos

```
receita-facil/
├── README.md
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

## Divisão preliminar de responsabilidades

| Integrante | Responsabilidades previstas |
|---|---|
| Lucas de Oliveira Mayer | Planejamento, estrutura HTML, integração do JavaScript e documentação inicial. |
| Vandesson Fonseca do Espirito Santo | Estilização CSS, testes no celular e revisão das funcionalidades e do planejamento. |

A divisão é preliminar e poderá ser ajustada de acordo com a participação de cada integrante.

## Cuidados legais e éticos

- Não solicita cadastro nem coleta nome, e-mail, localização ou dados sensíveis.
- Favoritos ficam apenas no dispositivo e podem ser apagados pelo navegador.
- Textos e elementos gráficos são autorais/criados para este protótipo; não utilizamos fotos de terceiros.
- As receitas são apenas sugestões. É necessário verificar alergias, ingredientes, higiene dos alimentos e cozimento adequado.
- Não incluir senhas, tokens ou dados pessoais no repositório.

## Próximas melhorias possíveis

Cadastro de receitas pelo usuário, lista de compras e pesquisa por vários ingredientes.

## Contexto da entrega

**Atividade da aula de 12/11/2026 - planejamento inicial do projeto final**. O tema permanece sujeito à aprovação do professor.

### Utilização de Inteligência Artificial no Desenvolvimento

Durante o desenvolvimento do projeto **Receita Fácil**, foram utilizadas ferramentas de inteligência artificial generativa como apoio ao processo de programação, planejamento e aprendizagem.

O **ChatGPT (OpenAI)** foi utilizado para auxiliar na definição da estrutura inicial da aplicação, organização dos arquivos, elaboração da documentação e sugestões de implementação de funcionalidades.

O **Codex (OpenAI)** também foi utilizado como ferramenta de consulta e apoio à programação, incluindo orientações sobre estruturação do código e resolução de erros identificados durante o desenvolvimento.

A metodologia adotada envolveu práticas de desenvolvimento assistido por inteligência artificial (*AI-assisted development*), incluindo a abordagem conhecida como *vibe coding*.

As ferramentas foram utilizadas como recursos de apoio. A equipe permanece responsável por compreender, revisar, testar e validar o código apresentado, bem como pelas decisões e pelo resultado final do projeto.

**Ferramentas utilizadas:** ChatGPT e OpenAI Codex.

**Tecnologias do projeto:** HTML5, CSS3, JavaScript e Git/GitHub.