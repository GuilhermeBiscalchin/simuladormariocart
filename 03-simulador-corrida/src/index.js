// criação dos objetos
const characters = [
  {
    ID: 1,
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  },
  {
    ID: 2,
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  {
    ID: 3,
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
  },
  {
    ID: 4,
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
];
// escolha do personagem

//criando a função de jogar os dados.
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

//Qual o nome que vai ser da competição
async function getRandomBlock() {
  let random = Math.random();
  //console.log(random);
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

//chamar os jogadores e definir numero de rodadas
async function playRaceEngine(figure1, figure2) {
  figure1 = characters[Math.floor(Math.random() * characters.length)];
  figure2 = characters[Math.floor(Math.random() * characters.length)];

  console.log(
    `🚗🏁🚦 Corrida entre ${figure1.NOME} e ${figure2.NOME} vai começar...\n`
  );

  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;
    //Continuar a logica daqui
    if (block === "RETA") {
      //console.log("Eu sou uma Reta!");
      totalTestSkill1 = diceResult1 + figure1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + figure2.VELOCIDADE;

      await logRollResult(
        figure1.NOME,
        "velocidade",
        diceResult1,
        figure1.VELOCIDADE
      );

      await logRollResult(
        figure2.NOME,
        "velocidade",
        diceResult1,
        figure2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + figure1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + figure2.MANOBRABILIDADE;

      await logRollResult(
        figure1.NOME,
        "manobrabilidade",
        diceResult1,
        figure1.MANOBRABILIDADE
      );

      await logRollResult(
        figure2.NOME,
        "manobrabilidade",
        diceResult2,
        figure2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + figure1.PODER;
      let powerResult2 = diceResult2 + figure2.PODER;

      console.log(`${figure1.NOME} confrontou com ${figure2.NOME}! 🥋🥋🥋`);

      await logRollResult(figure1.NOME, "poder", diceResult1, figure1.PODER);

      await logRollResult(figure2.NOME, "poder", diceResult2, figure2.PODER);

      // if condição dupla combinado
      if (powerResult1 > powerResult2 && figure2.PONTOS > 0) {
        console.log(
          `${figure1.NOME} venceu o confronto! ${figure2.NOME} perdeu 1 ponto!`
        );
        figure2.PONTOS--;
      } else if (powerResult2 > powerResult1 && figure1.PONTOS > 0) {
        console.log(
          `${figure2.NOME} venceu o confrontou! ${figure1.NOME} perdeu 1 ponto`
        );
        figure1.PONTOS--;
      }
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${figure1.NOME} marcou um ponto!`);
      figure1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${figure2.NOME} marcou um ponto!`);
      figure2.PONTOS++;
    }
    console.log("___________________________");
  }

  console.log("Resultado Final!!!....\n");

  console.log(`${figure1.NOME} : ${figure1.PONTOS} pontos(s)`);
  console.log(`${figure2.NOME} : ${figure2.PONTOS} pontos(s)`);

  //Continuar daqui com o IF
  if (figure1.PONTOS > figure2.PONTOS) {
    console.log(`\n${figure1.NOME} venceu a corrida!`);
  } else if (figure2.PONTOS > figure1.PONTOS) {
    console.log(`\n${figure2.NOME} venceu a corrida!`);
  } else {
    console.log("A corrida terminou em empate!");
  }
}

//função principal
(async function main() {
  await playRaceEngine();
})();
