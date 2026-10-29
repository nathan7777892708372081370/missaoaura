function setup() {
  noCanvas();

  const campoData = document.getElementById("nascimento");
  campoData.max = dataDeHoje();

  const cadastro = document.getElementById("form-cadastro");
  const formulario = document.getElementById("form-perguntas");

  cadastro.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nascimento = campoData.value;

    if (!nome || !nascimento) {
      alert("Preencha seu nome e sua data de nascimento!");
      return;
    }

    if (nascimento > dataDeHoje()) {
      alert("A data de nascimento não pode ser no futuro!");
      return;
    }

    window.tripulante = {
      nome: nome,
      nascimento: nascimento,
      idade: calcularIdade(nascimento)
    };

    document.getElementById("tela-cadastro").hidden = true;
    document.getElementById("tela-perguntas").hidden = false;

    document.getElementById("mensagem-tripulante").textContent =
      "Tripulante " + nome +
      ", responda às cinco perguntas para descobrir seu perfil.";

    window.scrollTo(0, 0);
  });

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const respostas = [];

    for (let i = 1; i <= 5; i++) {
      const marcada = document.querySelector(
        'input[name="q' + i + '"]:checked'
      );

      if (!marcada) {
        alert("Responda à pergunta " + i + "!");
        return;
      }

      respostas.push(marcada.value);
    }

    const contagem = { A: 0, B: 0, C: 0, D: 0, E: 0 };

    respostas.forEach(function(letra) {
      contagem[letra]++;
    });

    let maior = -1;
    let empatados = [];

    for (const letra of ["A", "B", "C", "D", "E"]) {
      if (contagem[letra] > maior) {
        maior = contagem[letra];
        empatados = [letra];
      } else if (contagem[letra] === maior) {
        empatados.push(letra);
      }
    }

    // Desempate pela primeira alternativa empatada.
    const letraPerfil = empatados[0];

    const perfis = {
      A: {
        nome: "Engenheiro Espacial",
        descricao: "Você gosta de construir, consertar e resolver problemas na prática.",
        imagem: "perfil-1.jpg"
      },
      B: {
        nome: "Cientista Cósmico",
        descricao: "Você é curioso e gosta de pesquisar e descobrir respostas.",
        imagem: "perfil-2.jpg"
      },
      C: {
        nome: "Explorador Galáctico",
        descricao: "Você gosta de aventura e de conhecer lugares desconhecidos.",
        imagem: "perfil-3.jpg"
      },
      D: {
        nome: "Comandante Estelar",
        descricao: "Você gosta de planejar, organizar e coordenar equipes.",
        imagem: "perfil-1.jpg"
      },
      E: {
        nome: "Inventor do Universo",
        descricao: "Você gosta de criar ideias diferentes e imaginar novas soluções.",
        imagem: "perfil-2.jpg"
      }
    };

    const perfil = perfis[letraPerfil];

    // IMPORTANTE: escondemos apenas as perguntas,
    // não a seção inteira que contém o resultado.
    formulario.hidden = true;
    document.getElementById("mensagem-tripulante").hidden = true;

    const resultado = document.getElementById("resultado");
    resultado.hidden = false;

    document.getElementById("nome-perfil").textContent = perfil.nome;

    document.getElementById("descricao-perfil").textContent =
      window.tripulante.nome + ", " + perfil.descricao;

    const imagem = document.getElementById("imagem-perfil");
    imagem.style.display = "block";
    imagem.src = perfil.imagem;
    imagem.alt = perfil.nome;

    imagem.onerror = function() {
      this.style.display = "none";
      document.getElementById("descricao-perfil").textContent +=
        " (Não foi possível carregar a imagem: " + perfil.imagem + ")";
    };

    window.scrollTo(0, 0);
  });
}

function dataDeHoje() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return ano + "-" + mes + "-" + dia;
}

function calcularIdade(dataNascimento) {
  const nascimento = new Date(dataNascimento + "T00:00:00");
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  if (
    hoje.getMonth() < nascimento.getMonth() ||
    (
      hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() < nascimento.getDate()
    )
  ) {
    idade--;
  }

  return idade;
}