// criação dos objetos
const player01 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player02 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

//criando a função de jogar os dados.

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

//gerar o resultado da competição
async function getRandomBlock() {
  let random = Math.random();
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

//Função para chamada das informaçoes da modalidade

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

//função para chamar os objetos e aguardar execução
async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    //sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    //rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    //teste dos dados
    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥋`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      //if condição dupla combinado
      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto`
        );
        character2.PONTOS--;
      } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto`
        );
        character1.PONTOS--;
      } else {
        console.log("Confronto empatado ou jogador com 0 pontos");
      }
    }
    // if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
    //   console.log(
    //     `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto`
    //   );
    //   character1.PONTOS--;
    // }
    // console.log(
    //   powerResult1 === powerResult2
    //     ? "Confronto Empatado! Nenhum ponto foi retirado!"
    //     : ""
    // );
    //if ternarios
    // character2.PONTOS -=
    //   powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
    // character1.PONTOS -=
    //   powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;

    //verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("________________________");
  }
}

//declarando o vencedor
async function declareWinner(character1, character2) {
  console.log("Resultado final");
  console.log(`${character1.NOME} : ${character1.PONTOS} pontos(s)`);
  console.log(`${character2.NOME} : ${character2.PONTOS} pontos(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns!`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns!`);
  } else {
    console.log("A corrida terminou em empate");
  }
}

//função auto invocavel e principal

(async function main() {
  console.log(
    `🚗🏁🚦 Corrida entre ${player01.NOME} e ${player02.NOME} vai começar...\n`
  );

  await playRaceEngine(player01, player02);

  await declareWinner(player01, player02);
})();
