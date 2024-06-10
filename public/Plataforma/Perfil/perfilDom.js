
const container = document.getElementById('showPropriedades')

fetch(`../../armazem/listar/${sessionStorage.getItem("ID_EMPRESA")}`, {
    method: "GET",
}).then(resposta => {
    console.log(resposta)

    if (resposta.ok) {
        resposta.json().then(listaArmazens => {
            listaArmazens.forEach(armazem => {
                console.log(armazem)

                const boxProp = document.createElement('div');
                boxProp.className = 'box-prop';

                // Cria a seção de informações da propriedade
                const infoProp = document.createElement('div');
                infoProp.className = 'info-prop';

                // Adiciona a imagem
                const img = document.createElement('img');
                img.src = './images/imagem.svg';
                img.alt = '';

                // Adiciona os dados da propriedade
                const dadosPropriedade = document.createElement('div');
                dadosPropriedade.className = 'dados-propriedade';

                const span1 = document.createElement('span');
                span1.textContent = armazem.cidade;

                const span2 = document.createElement('span');
                span2.textContent = `Tipo: ${armazem.nome}`;

                const span3 = document.createElement('span');
                span3.textContent = `Capacidade: ${armazem.capacidade}t`;

                const span4 = document.createElement('span');
                span4.textContent = `Bairro: ${armazem.bairro}`;

                // Anexa os spans aos dados da propriedade
                dadosPropriedade.appendChild(span1);
                dadosPropriedade.appendChild(span2);
                dadosPropriedade.appendChild(span3);
                dadosPropriedade.appendChild(span4);

                // Anexa a imagem e os dados da propriedade à seção de informações da propriedade
                infoProp.appendChild(img);
                infoProp.appendChild(dadosPropriedade);

                // Cria a seção de descrição da propriedade
                const descProp = document.createElement('div');
                descProp.className = 'desc-prop';

                const tituloDesc = document.createElement('span');
                tituloDesc.className = 'titulo-desc';
                tituloDesc.innerHTML = 'Descrição:<br>';

                const br = document.createElement('br');

                const spanDesc = document.createElement('span');
                spanDesc.textContent = armazem.descricao;

                // Anexa os elementos à seção de descrição da propriedade
                descProp.appendChild(tituloDesc);
                descProp.appendChild(br);
                descProp.appendChild(spanDesc);

                // Anexa as seções de informações e descrição ao contêiner principal
                boxProp.appendChild(infoProp);
                boxProp.appendChild(descProp);

                container.appendChild(boxProp)

            })
        })
    }
})

