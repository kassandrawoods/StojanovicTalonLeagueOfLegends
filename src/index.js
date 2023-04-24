// -------------------- IMPPORT --------------------

import * as d3 from "d3";
import { csv } from "d3-fetch";
import {nest} from 'd3-collection';
import { selectAll } from "d3";

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
 L'ADC est un rôle important dans les parties classées, car les dégâts qu'il inflige peuvent faire la différence lors des combats d'équipe. Il est également important pour l'ADC de bien gérer sa position en combat pour éviter les dégâts et rester en vie afin de continuer à infliger des dégâts importants.<button class="map" type="button"><a href='#frameStat'><span>Découvrir les stats</span></a></button>`;

const textSupport = `Le rôle de support dans League of Legends est d'aider l'équipe en fournissant des soins, des boucliers et
 des contrôles de foule à ses coéquipiers. Le support est généralement placé dans la voie du bas avec l'ADC (le tireur),
  mais peut aussi aider d'autres lanes en se déplaçant rapidement grâce à la mobilité de ses sorts. Le support doit également aider à 
  contrôler la carte avec des sorts de balises et à aider à prendre des objectifs stratégiques tels que les dragons et les barons Nashor. 
  Enfin, le support doit protéger son ADC et aider à sécuriser les kills en les laissant à ses coéquipiers plus offensifs. Le support est un 
  rôle important qui nécessite des compétences en matière de positionnement, de communication et de coopération pour aider son équipe à remporter 
  la victoire<button class="map" type="button"><a href='#frameStat'><span>Découvrir les stats</span></a></button>`;

const textMid = `Le mid dans League of Legends est un champion qui est placé au centre de la carte. Son rôle est de gagner 
sa propre lane en affrontant son adversaire direct, de contrôler la carte en surveillant les autres lanes et en aidant ses 
coéquipiers, de faire des dégâts massifs en peu de temps et de prendre des objectifs stratégiques tels que les tourelles et 
les dragons. En somme, le mid est un rôle important qui nécessite des compétences en matière de combat, de stratégie et de mouvement 
pour aider son équipe à remporter la victoire.<button class="map" type="button"><a href='#frameStat'><span>Découvrir les stats</span></a></button>`;

const textJungle = `Le jungle dans League of Legends est un rôle flexible qui consiste à parcourir la jungle pour tuer 
les monstres neutres, aider ses coéquipiers à gagner leur lane, contrôler la carte avec des sorts de balises et à prendre 
des objectifs stratégiques tels que les dragons et les barons Nashor. Le jungler peut influencer le cours du jeu en donnant 
des avantages à son équipe et en empêchant l'ennemi d'en gagner. Le jungle nécessite des compétences en matière de mouvement, 
de stratégie et de coopération pour aider son équipe à remporter la victoire.<button class="map" type="button"><a href='#frameStat'><span>Découvrir les stats</span></a></button>`;

const textTop = `Le rôle de top dans League of Legends est d'être placé sur la voie supérieure de la carte et d'affronter 
l'adversaire direct, souvent un autre champion solitaire. Le top doit également aider son équipe en contrôlant la carte avec 
des sorts de balises et en prenant des objectifs stratégiques tels que les tours et les Hérauts. En outre, le top peut devenir
 un tank pour l'équipe en achetant des objets défensifs pour protéger les coéquipiers fragiles, ou devenir un carry en infligeant 
 des dégâts massifs à l'ennemi. Le top est un rôle important qui nécessite des compétences en matière de combat, de stratégie et de 
 mouvement pour aider son équipe à remporter la victoire.<button class="map" type="button"><a href='#frameStat'><span>Découvrir les stats</span></a></button>`;

 const textExplicationRetourBouton = `Il y a cinq rôles principaux dans League of Legends :<br>

     <br><strong>Top</strong> : placé sur la voie supérieure, le top doit affronter l'adversaire direct et aider son équipe en contrôlant la carte et en prenant des objectifs stratégiques.<br>
     
     <br><strong>Jungle</strong> : parcourt la jungle pour tuer les monstres neutres, aider ses coéquipiers à gagner leur lane, contrôler la carte et prendre des objectifs stratégiques.<br>
     
     <br><strong>Mid</strong> : placé au centre de la carte, le mid doit aider son équipe en infligeant des dégâts massifs à l'ennemi, en contrôlant la carte et en prenant des objectifs stratégiques.<br>
     
     <br><strong>ADC</strong> : placé dans la voie du bas avec le support, l'ADC est un tireur qui inflige des dégâts à distance à l'ennemi et doit être protégé par son support pour maximiser ses dégâts.<br>
     
     <br><strong>Support</strong> : placé dans la voie du bas avec l'ADC, le support aide l'équipe en fournissant des soins, des boucliers et des contrôles de foule à ses coéquipiers, en contrôlant la carte et en aidant à prendre des objectifs stratégiques`

     // -------------------- BOUTONS ROLE --------------------

     let isExpanded = false;
     let previousButton = null;
     
     const expandButton = (button, text) => {
       button.style.backgroundColor = "rgb(11, 150, 227)";
       textExplication.innerHTML = text;
       if (previousButton !== null) {
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
         resetButton(btnAdc, textExplicationRetourBouton);
       }
     });
     
     btnSupport.addEventListener("click", () => {
       if (!isExpanded) {
         expandButton(btnSupport, textSupport);
       } else {
         resetButton(btnSupport, textExplicationRetourBouton);
       }
     });
     
     btnMid.addEventListener("click", () => {
       if (!isExpanded) {
         expandButton(btnMid, textMid);
       } else {
         resetButton(btnMid, textExplicationRetourBouton);
       }
     });
     
     btnTop.addEventListener("click", () => {
       if (!isExpanded) {
         expandButton(btnTop, textTop);
       } else {
         resetButton(btnTop, textExplicationRetourBouton);
       }
     });
     
     btnJungle.addEventListener("click", () => {
       if (!isExpanded) {
         expandButton(btnJungle, textJungle);
       } else {
         resetButton(btnJungle, textExplicationRetourBouton);
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

  // -------------------- DATA GRAPHIQUE CAMEMBERT --------------------

  .then(function (cleanData) {
    console.log(cleanData);
    var nbTop = 0;
    var nbAdc = 0;
    var nbJungle = 0;
    var nbSupport = 0;
    var nbMid = 0;
    for (var i = 0; i < cleanData.length; ++i) {
      if (cleanData[i].Role == "TOP") nbTop++;
      if (cleanData[i].Role == "ADC") nbAdc++;
      if (cleanData[i].Role == "JUNGLE") nbJungle++;
      if (cleanData[i].Role == "SUPPORT") nbSupport++;
      if (cleanData[i].Role == "MID") nbMid++;
    }

    console.log(nbTop);
    console.log(nbAdc);
    console.log(nbJungle);
    console.log(nbSupport);
    console.log(nbMid);

    const totRole = nbTop + nbAdc + nbJungle + nbSupport + nbMid;
    const prcTop = Math.round((nbTop / totRole) * 100);
    const prcAdc = Math.round((nbAdc / totRole) * 100);
    const prcJungle = Math.round((nbJungle / totRole) * 100);
    const prcMid = Math.round((nbMid / totRole) * 100);
    const prcSupport = Math.round((nbSupport / totRole) * 100);

    // -------------------- GRAPHIQUE CAMEMBERT --------------------

    var data = [
      { label: "ADC", value: prcAdc },
      { label: "Support", value: prcSupport },
      { label: "Mid", value: prcMid },
      { label: "Top", value: prcTop },
      { label: "Jungle", value: prcJungle },
    ];

    // Dimensions du graphique
    var width = 500;
    var height = 500;
    var radius = Math.min(width, height) / 2;

    // Couleurs à utiliser
    var color = d3
      .scaleOrdinal()
      .range([
        "#044040",
        "#308C83",
        "#025940",
        "#62A632",
        "#457324",
      ]);

    // Création de l'élément SVG pour le graphique
    var svg = d3
      .select("#pieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Création de l'arc pour chaque tranche de données
    var arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    // Création de la mise à l'échelle pour les valeurs des données
    var pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });

    // Ajout des tranches de données en tant que chemins (path)
    var g = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d) {
        return color(d.data.label);
      });

    // Ajout des étiquettes pour chaque tranche de données
    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .text(function (d) {
        return d.data.value + "%" + " " + d.data.label;
      });

    //changer la couleur du texte
    d3.selectAll("text").style("fill", "white");
    //changer la typo du texte
    d3.selectAll("text").style("font-family", "Spiegel");

    //mettre en avant une tranche de données lors du hover
    g.on("mouseover", function (d) {
      d3.select(this)
        .select("path")
        .transition()
        .duration(500)
        .attr("d", d3.arc().outerRadius(radius).innerRadius(0));
    });

    g.on("mouseout", function (d) {
      d3.select(this).select("path").transition().duration(500).attr("d", arc);
    });

    //centrer le texte sur la tranche de données
    d3.selectAll("text").attr("text-anchor", "middle");
  });

// -------------------- RADAR CHART --------------------

  // // Dimensions du conteneur SVG
  // const width = 600;
  // const height = 600;
  // // Données pour le graphique
  // const data = [
  //   { label: "Tank", value: 5 },
  //   { label: "Fighter", value: 7 },
  //   { label: "Mage", value: 3 },
  //   { label: "Assassin", value: 6 },
  //   { label: "Marksmann", value: 4 },
  //   { label: "Support", value: 9 }
  // ];

  // // Configuration de l'angle et de l'échelle pour le graphique
  // const angleSlice = Math.PI * 2 / data.length;
  // const rScale = d3.scaleLinear()
  //   .range([0, (Math.min(width, height) / 2) * 0.8])
  //   .domain([0, 10]);

  // // Création de l'élément SVG
  // const svg = d3.select("#radarChart")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr("class", "radar");

  // // Création du groupe pour le graphique
  // const g = svg.append("g")
  //   .attr("transform", `translate(${width/2},${height/2})`);

  // // Ajout des cercles pour les marques de graduation
  // const levelScale = d3.scaleLinear()
  //   .range([0, rScale(10)])
  //   .domain([0, 10]);
  // const numLevels = 5;
  // for (let level = 0; level < numLevels; level++) {
  //   const levelRadius = levelScale((level + 1) * 2);
  //   g.selectAll(".levels")
  //     .data(data)
  //     .enter()
  //     .append("circle")
  //     .attr("class", "grid-circle")
  //     .attr("r", levelRadius)
  //     .style("fill", "#CDCDCD")
  //     .style("stroke", "#CDCDCD")
  //     .style("fill-opacity", 0.1)
  //     .style("stroke-opacity", 0.5);
  // }

  // // Ajout des lignes pour les axes
  // const axisGroup = g.append("g")
  //   .attr("class", "axisWrapper");
  // axisGroup.selectAll(".radar-axis-line")
  //   .data(data)
  //   .enter()
  //   .append("line")
  //   .attr("class", "radar-axis-line")
  //   .attr("x1", 0)
  //   .attr("y1", 0)
  //   .attr("x2", (d, i) => rScale(10) * Math.cos(angleSlice * i - Math.PI/2))
  //   .attr("y2", (d, i) => rScale(10) * Math.sin(angleSlice * i - Math.PI/2))
  //   .attr("stroke", "white")
  //   .attr("stroke-width", "2px");

  // // Ajout des étiquettes pour les axes
  // const axisLabels = svg.selectAll(".axis-label")
  //   .data(categories)
  //   .enter().append("g")
  //   .attr("class", "axis-label");

  // axisLabels.append("text")
  //   .attr("class", "label")
  //   .attr("text-anchor", "middle")
  //   .attr("dy", "0.35em")
  //   .attr("x", (d, i) => xScale(i) * Math.cos(angleSlice * i - Math.PI / 2))
  //   .attr("y", (d, i) => xScale(i) * Math.sin(angleSlice * i - Math.PI / 2))
  //   .text(d => d)
  //   .call(wrapText, 80);


  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.radius = 3;
  RadarChart.defaultConfig.w = 400;
  RadarChart.defaultConfig.h = 400;
  
  var data = [
    {
      className: 'germany', // optional can be used for styling
      axes: [
        {axis: "strength", value: 6}, 
        {axis: "intelligence", value: 8}, 
        {axis: "charisma", value: 11},  
        {axis: "dexterity", value: 9},  
        {axis: "luck", value: 6}
      ]
    },
    {
      className: 'argentina',
      axes: [
        {axis: "strength", value: 7}, 
        {axis: "intelligence", value: 5}, 
        {axis: "charisma", value: 7},  
        {axis: "dexterity", value: 5},  
        {axis: "luck", value: 9}
      ]
    }
  ];
  
  
  
  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  var svg = d3.select('body').append('svg')
    .attr('width', cfg.w + cfg.w + 50)
    .attr('height', cfg.h + cfg.h / 4);
  svg.append('g').classed('single', 1).datum(data).call(chart);
  render();







