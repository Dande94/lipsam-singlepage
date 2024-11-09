document.addEventListener("DOMContentLoaded", function () {
    // Array de objetos representando todos os itens de produtos
    const itens = [
        {
            id: "CachorroQuente",
            nome: "Combo Cachorro-Quente c/ Batatas",
            descricao: "Um lanche c/ 1x Salsicha robusta, molho, condimentos + 200g de Batata frita",
            preco: "12,99",
            imgSrc: "assets/img/cachorro_quente_fritas.png",
            tipo: "combo"
        },
        {
            id: "HamburguerSimples",
            nome: "Combo Hamburger c/ Batatas",
            descricao: "Um lanche c/ 1x carne de hamburger, Salada(Alface, Tomate), 1x fatia de queijo + 200g de Batata frita",
            preco: "19,99",
            imgSrc: "assets/img/hamburguer_simples_fritas.png",
            tipo: "combo"
        },
        {
            id: "HamburguerDuplo",
            nome: "Combo Hamburger duplo c/ Batatas",
            descricao: "Um lanche c/ 2x carne de hamburger, Salada(Alface, Tomate, pepino), 1x fatia de queijo + 200g de Batata frita",
            preco: "23,99",
            imgSrc: "assets/img/hamburguer_duplo_fritas.png",
            tipo: "combo"
        },
        {
            id: "CocaCola",
            nome: "Coca-Cola lata",
            descricao: "Lata de refrigerante com 360ml",
            preco: "05,99",
            imgSrc: "assets/img/coca_lata.jpg",
            tipo: "bebida"
        },
        {
            id: "Guarana",
            nome: "Guaraná lata",
            descricao: "Lata de refrigerante com 360ml",
            preco: "04,99",
            imgSrc: "assets/img/guarana_lata.png",
            tipo: "bebida"
        },
        {
            id: "Fanta",
            nome: "Fanta lata",
            descricao: "Lata de refrigerante com 360ml",
            preco: "04,99",
            imgSrc: "assets/img/fanta_lata.webp",
            tipo: "bebida"
        },
        {
            id: "Chocolate",
            nome: "Mousse de Chocolate",
            descricao: "Potinho de 100ml de mousse",
            preco: "03,99",
            imgSrc: "assets/img/mousse_chocolate.jpg",
            tipo: "sobremesa"
        },
        {
            id: "Maracuja",
            nome: "Mousse de Maracujá",
            descricao: "Potinho de 100ml de mousse",
            preco: "03,99",
            imgSrc: "assets/img/mousse_maracuja.jpg",
            tipo: "sobremesa"
        },
        {
            id: "DoceLeite",
            nome: "Mousse de Doce de Leite",
            descricao: "Potinho de 100ml de mousse",
            preco: "04,99",
            imgSrc: "assets/img/mousse_doce_leite.jpg",
            tipo: "sobremesa"
        }
    ];

    // Array para armazenar o pedido (objeto para cada tipo de item)
    const pedidos = {
        combo: {},
        bebida: {},
        sobremesa: {}
    };

    // Seleciona as sections corretas com base no tipo
    const sections = {
        combo: document.querySelector('.produtos.combo'),
        bebida: document.querySelector('.produtos.bebidas'),
        sobremesa: document.querySelector('.produtos.sobremesa')
    };

    // Função para adicionar ou atualizar o item no pedido
    function adicionarItem(tipo, nome, preco, quantidade) {
        // Certifica-se de que o tipo de produto é válido
        if (pedidos[tipo]) {
            if (!pedidos[tipo][nome]) {
                pedidos[tipo][nome] = { preco: parseFloat(preco.replace(',', '.')), quantidade: 0 };
            }
            pedidos[tipo][nome].quantidade += quantidade;
            atualizarTotal(); // Atualiza o total após adicionar o item
        }
    }

    // Função para calcular e atualizar o total da compra
    function atualizarTotal() {
        const totalPrecoCombo = Object.values(pedidos.combo).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalPrecoBebida = Object.values(pedidos.bebida).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalPrecoSobremesa = Object.values(pedidos.sobremesa).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalPreco = totalPrecoCombo + totalPrecoBebida + totalPrecoSobremesa;
        const totalFormatado = totalPreco.toFixed(2).replace('.', ',');

        // Atualiza o elemento que mostra o total
        document.getElementById("total-compra").textContent = `Total: R$${totalFormatado}`;
    }

    // Percorre todos os itens e insere na section correspondente
    itens.forEach(item => {
        const itemHTML = `
            <div id="${item.id}" class="item" data-tipo="${item.tipo}">
                <h4>${item.nome}</h4>
                <div class="item-desc">
                    <div class="desc">
                        <article>${item.descricao}</article>
                        <p><sup>R$</sup><strong>${item.preco}</strong></p>
                        <label>Qtd:</label>
                        <div class="contador">
                            <div class="qtd-itens">
                                <button type="button" class="btn-decrementar" data-id="quantidade${item.id}">-</button>
                                <input type="number" id="quantidade${item.id}" value="0" min="0">
                                <button type="button" class="btn-incrementar" data-id="quantidade${item.id}">+</button>
                            </div>
                            <div>
                                <button class="btn-confirmar" data-item="${item.id}" data-tipo="${item.tipo}">Confirmar</button>
                            </div>
                        </div>
                    </div>
                    <div class="img-produto">
                        <img src="${item.imgSrc}" alt="${item.nome}">
                    </div>
                </div>
            </div>
        `;

        // Adiciona o item à section correta
        if (sections[item.tipo]) {
            sections[item.tipo].insertAdjacentHTML('beforeend', itemHTML);
        }
    });

    // Adiciona eventos para os botões de incrementar e decrementar
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-incrementar')) {
            const inputId = event.target.getAttribute('data-id');
            const input = document.getElementById(inputId);
            input.value = parseInt(input.value) + 1;
        } else if (event.target.classList.contains('btn-decrementar')) {
            const inputId = event.target.getAttribute('data-id');
            const input = document.getElementById(inputId);
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
            }
        }
    });

    // Adiciona evento ao botão de confirmar
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-confirmar')) {
            const itemID = event.target.getAttribute("data-item");
            const tipo = event.target.getAttribute("data-tipo");
            const itemSelecionado = document.getElementById(itemID);
            const nomeItem = itemSelecionado.querySelector("h4").textContent;
            const precoItem = itemSelecionado.querySelector("strong").textContent;
            const quantidadeItem = parseInt(itemSelecionado.querySelector("input[type='number']").value || 1);

            adicionarItem(tipo, nomeItem, precoItem, quantidadeItem);

            itemSelecionado.style.borderColor = "green"; // Feedback visual para item adicionado
            itemSelecionado.querySelector(".confirmacao").textContent = `${nomeItem} adicionado com quantidade ${quantidadeItem}.`;
        }
    });
});
