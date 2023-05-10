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

const titre = document.getElementById("titre");

const btnTop2 = document.getElementById("top2");
const btnSupport2 = document.getElementById("support2");
const btnMid2 = document.getElementById("mid2");
const btnJungle2 = document.getElementById("jungle2");
const btnAdc2 = document.getElementById("adc2");

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

    //si clique sur btnScore, afficher graphique score
    /*btnScore.addEventListener("click", function () {
      //changer titre
      titre.innerHTML = "SCORE DES 25 MEILLEURS CHAMPIONS";
      createBarChartScore(cleanData);
    });
    //si clique sur btnBann, afficher graphique bann
    btnBann.addEventListener("click", function () {
      titre.innerHTML = "TAUX DE BANNISSEMENT DES 25 MEILLEURS CHAMPIONS";
      createBarChartBann(cleanData);
    });

    btnPick.addEventListener("click", function () {
      titre.innerHTML = "TAUX DE PICK DES 25 MEILLEURS CHAMPIONS";
      createBarChartPick(cleanData);
    });*/

    btnTop2.addEventListener("click", function () {
      topBarchart(cleanData);
    });

    btnAdc2.addEventListener("click", function () {
      adcBarchart(cleanData);
    });
    btnSupport2.addEventListener("click", function () {
      supportBarchart(cleanData);
    });
    btnMid2.addEventListener("click", function () {
      midBarchart(cleanData);
    });
    btnJungle2.addEventListener("click", function () {
      jungleBarchart(cleanData);
    });
  });
