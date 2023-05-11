// -------------------- IMPPORT --------------------
import * as d3 from "d3";
import { csv } from "d3-fetch";
import { createCamembert } from "./camembert";
import { createRadarChart } from "./radarChart";
import {
  createBarChartScore,
  createBarChartBann,
  createBarChartPick,
} from "./barChart";
import {
  topBarchart,
  adcBarchart,
  supportBarchart,
  midBarchart,
  jungleBarchart,
} from "./alternatif";

// -------------------- DOM --------------------

const btnAdc = document.querySelector("#adc");
const btnSupport = document.querySelector("#support");
const btnMid = document.querySelector("#mid");
const btnTop = document.querySelector("#top");
const btnJungle = document.querySelector("#jungle");
const textExplication = document.querySelector("#explication");

const map = document.querySelector("#map-image");

const fadeInElements = document.querySelectorAll(".fade-in");

function fadeIn() {
  for (let i = 0; i < fadeInElements.length; i++) {
    const element = fadeInElements[i];
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom >= 0) {
      element.style.opacity = 1;
    }
  }
}

window.addEventListener("scroll", fadeIn);

const textADC = `Dans League of Legends, ADC signifie "Attack Damage Carry", ce qui se traduit en français par "porte-étendard des dégâts d'attaque". L'ADC est un type de champion qui inflige principalement des dégâts physiques à distance en utilisant des attaques de base, des compétences et des objets.
 L'objectif de l'ADC est de causer des dégâts importants aux champions ennemis tout en restant à une distance sûre de leurs attaques. L'ADC est généralement positionné dans la voie du bas (bot lane) aux côtés d'un support pour obtenir un avantage en équipe lors de la phase de laning.
 L'ADC est un rôle important dans les parties classées, car les dégâts qu'il inflige peuvent faire la différence lors des combats d'équipe. Il est également important pour l'ADC de bien gérer sa position en combat pour éviter les dégâts et rester en vie afin de continuer à infliger des dégâts importants.`;

const textSupport = `Le rôle de support dans League of Legends est d'aider l'équipe en fournissant des soins, des boucliers et
 des contrôles de foule à ses coéquipiers. Le support est généralement placé dans la voie du bas avec l'ADC (le tireur),
  mais peut aussi aider d'autres lanes en se déplaçant rapidement grâce à la mobilité de ses sorts. Le support doit également aider à 
  contrôler la carte avec des sorts de balises et à aider à prendre des objectifs stratégiques tels que les dragons et les barons Nashor. 
  Enfin, le support doit protéger son ADC et aider à sécuriser les kills en les laissant à ses coéquipiers plus offensifs. Le support est un 
  rôle important qui nécessite des compétences en matière de positionnement, de communication et de coopération pour aider son équipe à remporter 
  la victoire.`;

const textMid = `Le mid dans League of Legends est un champion qui est placé au centre de la carte. Son rôle est de gagner 
sa propre lane en affrontant son adversaire direct, de contrôler la carte en surveillant les autres lanes et en aidant ses 
coéquipiers, de faire des dégâts massifs en peu de temps et de prendre des objectifs stratégiques tels que les tourelles et 
les dragons. En somme, le mid est un rôle important qui nécessite des compétences en matière de combat, de stratégie et de mouvement 
pour aider son équipe à remporter la victoire.`;

const textJungle = `Le jungle dans League of Legends est un rôle flexible qui consiste à parcourir la jungle pour tuer 
les monstres neutres, aider ses coéquipiers à gagner leur lane, contrôler la carte avec des sorts de balises et à prendre 
des objectifs stratégiques tels que les dragons et les barons Nashor. Le jungler peut influencer le cours du jeu en donnant 
des avantages à son équipe et en empêchant l'ennemi d'en gagner. Le jungle nécessite des compétences en matière de mouvement, 
de stratégie et de coopération pour aider son équipe à remporter la victoire.`;

const textTop = `Le rôle de top dans League of Legends est d'être placé sur la voie supérieure de la carte et d'affronter 
l'adversaire direct, souvent un autre champion solitaire. Le top doit également aider son équipe en contrôlant la carte avec 
des sorts de balises et en prenant des objectifs stratégiques tels que les tours et les Hérauts. En outre, le top peut devenir
 un tank pour l'équipe en achetant des objets défensifs pour protéger les coéquipiers fragiles, ou devenir un carry en infligeant 
 des dégâts massifs à l'ennemi. Le top est un rôle important qui nécessite des compétences en matière de combat, de stratégie et de 
 mouvement pour aider son équipe à remporter la victoire.`;

const textExplicationRetourBouton = `Il y a cinq rôles principaux dans League of Legends :<br>

     <br><strong>Top</strong> : placé sur la voie supérieure, le top doit affronter l'adversaire direct et aider son équipe en contrôlant la carte et en prenant des objectifs stratégiques.<br>
     
     <br><strong>Jungle</strong> : parcourt la jungle pour tuer les monstres neutres, aider ses coéquipiers à gagner leur lane, contrôler la carte et prendre des objectifs stratégiques.<br>
     
     <br><strong>Mid</strong> : placé au centre de la carte, le mid doit aider son équipe en infligeant des dégâts massifs à l'ennemi, en contrôlant la carte et en prenant des objectifs stratégiques.<br>
     
     <br><strong>ADC</strong> : placé dans la voie du bas avec le support, l'ADC est un tireur qui inflige des dégâts à distance à l'ennemi et doit être protégé par son support pour maximiser ses dégâts.<br>
     
     <br><strong>Support</strong> : placé dans la voie du bas avec l'ADC, le support aide l'équipe en fournissant des soins, des boucliers et des contrôles de foule à ses coéquipiers, en contrôlant la carte et en aidant à prendre des objectifs stratégiques`;

// -------------------- BOUTONS ROLE --------------------

let isExpanded = false;
let previousButton = null;

const expandButton = (button, text) => {
  button.style.backgroundColor = "rgb(11, 150, 227)";
  textExplication.innerHTML = text;
  if (previousButton !== null && previousButton !== button) {
    previousButton.style.backgroundColor = "rgb(11, 198, 227)";
  }
  previousButton = button;
  isExpanded = true;
};

const resetButton = (button, text) => {
  button.style.backgroundColor = "rgb(11, 198, 227)";
  textExplication.innerHTML = text;
  isExpanded = false;
};

btnAdc.addEventListener("click", () => {
  if (!isExpanded) {
    expandButton(btnAdc, textADC);
  } else {
    if (previousButton === btnAdc) {
      resetButton(btnAdc, textExplicationRetourBouton);
    } else {
      resetButton(previousButton, textADC);
      expandButton(btnAdc, textADC);
    }
  }
});

btnSupport.addEventListener("click", () => {
  if (!isExpanded) {
    expandButton(btnSupport, textSupport);
  } else {
    if (previousButton === btnSupport) {
      resetButton(btnSupport, textExplicationRetourBouton);
    } else {
      resetButton(previousButton, textSupport);
      expandButton(btnSupport, textSupport);
    }
  }
});

btnMid.addEventListener("click", () => {
  if (!isExpanded) {
    expandButton(btnMid, textMid);
  } else {
    if (previousButton === btnMid) {
      resetButton(btnMid, textExplicationRetourBouton);
    } else {
      resetButton(previousButton, textMid);
      expandButton(btnMid, textMid);
    }
  }
});

btnTop.addEventListener("click", () => {
  if (!isExpanded) {
    expandButton(btnTop, textTop);
  } else {
    if (previousButton === btnTop) {
      resetButton(btnTop, textExplicationRetourBouton);
    } else {
      resetButton(previousButton, textTop);
      expandButton(btnTop, textTop);
    }
  }
});

btnJungle.addEventListener("click", () => {
  if (!isExpanded) {
    expandButton(btnJungle, textJungle);
  } else {
    if (previousButton === btnJungle) {
      resetButton(btnJungle, textExplicationRetourBouton);
    } else {
      resetButton(previousButton, textJungle);
      expandButton(btnJungle, textJungle);
    }
  }
});

// -------------------- BOUTONS ANIMATIONS --------------------

//while hover on map gets bigger
map.addEventListener("mouseover", () => {
  map.style.transform = "scale(1.1)";
  map.style.transition = "all 0.5s";
});

//while non hover on map gets smaller
map.addEventListener("mouseout", () => {
  map.style.transform = "scale(1)";
  map.style.transition = "all 0.5s";
});

const btnScore = document.getElementById("score");
const btnBann = document.getElementById("ban");
const btnPick = document.getElementById("pick");
const btnWinRate = document.getElementById("winrate");

const titre = document.getElementById("titre");

const btnTop2 = document.getElementById("top2");
const btnSupport2 = document.getElementById("support2");
const btnMid2 = document.getElementById("mid2");
const btnJungle2 = document.getElementById("jungle2");
const btnAdc2 = document.getElementById("adc2");

// const boutonStats = document.getElementById("boutonStats");

// -------------------- DATA --------------------
// -------------------- DATA --------------------
// -------------------- DATA --------------------

csv("/data/League of Legends Champion Stats 12.23.csv")
  .then(function (data) {
    //console.log(data);
    data.map(
      (d) => (
        (d.BanPerc = +d.BanPerc),
        (d.PickPerc = +d.PickPerc),
        (d.RolePerc = +d.RolePerc),
        (d.WinPerc = +d.WinPerc),
        (d.Trend = +d.Trend),
        (d.KDA = +d.KDA),
        (d.Score = +d.Score),
        (d.Role = d.Role)
      )
    );

    return data;
  })

  .then(function (cleanData) {
    console.log(cleanData);
    // -------------------- GRAPHIQUE CAMEMBERT -------------------- //
    createCamembert(cleanData);
    // -------------------- GRAPHIQUE RADAR -------------------- //
    createRadarChart(cleanData);
    // -------------------- GRAPHIQUE BARRE -------------------- //

    btnTop2.addEventListener("click", function () {
      const divTitre = document.getElementById("titre");
      divTitre.innerHTML = "";
      topBarchart(cleanData);
      setActiveButton(btnTop2);
      resetButtons();
      btnTop2.style.opacity = 1;
      btnMid2.style.opacity = 0.5;
      btnJungle2.style.opacity = 0.5;
      btnSupport2.style.opacity = 0.5;
      btnAdc2.style.opacity = 0.5;
      resetButtonColors();
    });

    btnAdc2.addEventListener("click", function () {
      const divTitre = document.getElementById("titre");
      divTitre.innerHTML = "";
      adcBarchart(cleanData);
      setActiveButton(btnAdc2);
      resetButtons();
      btnAdc2.style.opacity = 1;
      btnTop2.style.opacity = 0.5;
      btnJungle2.style.opacity = 0.5;
      btnSupport2.style.opacity = 0.5;
      btnMid2.style.opacity = 0.5;
      resetButtonColors();
    });

    btnSupport2.addEventListener("click", function () {
      const divTitre = document.getElementById("titre");
      divTitre.innerHTML = "";
      supportBarchart(cleanData);
      setActiveButton(btnSupport2);
      resetButtons();
      btnSupport2.style.opacity = 1;
      btnTop2.style.opacity = 0.5;
      btnJungle2.style.opacity = 0.5;
      btnMid2.style.opacity = 0.5;
      btnAdc2.style.opacity = 0.5;
      resetButtonColors();
    });

    btnMid2.addEventListener("click", function () {
      const divTitre = document.getElementById("titre");
      divTitre.innerHTML = "";
      midBarchart(cleanData);
      setActiveButton(btnMid2);
      resetButtons();
      btnMid2.style.opacity = 1;
      btnTop2.style.opacity = 0.5;
      btnJungle2.style.opacity = 0.5;
      btnSupport2.style.opacity = 0.5;
      btnAdc2.style.opacity = 0.5;
      resetButtonColors();
    });

    btnJungle2.addEventListener("click", function () {
      const divTitre = document.getElementById("titre");
      divTitre.innerHTML = "";
      jungleBarchart(cleanData);
      setActiveButton(btnJungle2);
      resetButtons();
      btnJungle2.style.opacity = 1;
      btnTop2.style.opacity = 0.5;
      btnMid2.style.opacity = 0.5;
      btnSupport2.style.opacity = 0.5;
      btnAdc2.style.opacity = 0.5;
      resetButtonColors();
    });

    function setActiveButton(activeButton) {
      // Remettre tous les boutons à leur couleur initiale
      btnTop2.style.backgroundColor = "";
      btnAdc2.style.backgroundColor = "";
      btnSupport2.style.backgroundColor = "";
      btnMid2.style.backgroundColor = "";
      btnJungle2.style.backgroundColor = "";
    
      // Mettre en surbrillance le bouton actif en bleu
      activeButton.style.backgroundColor = "rgb(11, 150, 227)";
    }
  });


      // Ajouter un écouteur d'événements à chaque bouton
    btnScore.addEventListener("click", function () {
      setActiveButton(btnScore);
      btnBann.style.opacity = "0.5";
      btnPick.style.opacity = "0.5";
      btnWinRate.style.opacity = "0.5";
      btnScore.style.opacity = "1";
    });

    btnBann.addEventListener("click", function () {
      setActiveButton(btnBann);
      btnScore.style.opacity = "0.5";
      btnPick.style.opacity = "0.5";
      btnWinRate.style.opacity = "0.5";
      btnBann.style.opacity = "1";  
    });

    btnPick.addEventListener("click", function () {
      setActiveButton(btnPick);
      btnScore.style.opacity = "0.5";
      btnBann.style.opacity = "0.5";
      btnWinRate.style.opacity = "0.5";
      btnPick.style.opacity = "1";
    });

    btnWinRate.addEventListener("click", function () {
      setActiveButton(btnWinRate);
      btnScore.style.opacity = "0.5";
      btnBann.style.opacity = "0.5";
      btnPick.style.opacity = "0.5";
      btnWinRate.style.opacity = "1";
    });

    // Fonction pour mettre en surbrillance le bouton actif
    function setActiveButton(activeButton) {
      // Remettre tous les boutons à leur couleur initiale
      btnScore.style.backgroundColor = "";
      btnBann.style.backgroundColor = "";
      btnPick.style.backgroundColor = "";
      btnWinRate.style.backgroundColor = "";

      // Mettre en surbrillance le bouton actif en bleu
      activeButton.style.backgroundColor = "rgb(11, 150, 227)";
    }

    function resetButtons() {
      btnScore.style.backgroundColor = "";
      btnBann.style.backgroundColor = "";
      btnPick.style.backgroundColor = "";
      btnWinRate.style.backgroundColor = "";
    }

    function resetButtonColors() {
      btnScore.style.opacity = 1;
      btnBann.style.opacity = 1;
      btnPick.style.opacity = 1;
      btnWinRate.style.opacity = 1;
    }

  
