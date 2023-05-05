import * as d3 from "d3";
import { csv } from "d3-fetch";

const divChamp = document.getElementById("nom");

function createBarChartScore(donnees) {
  //vider divChamp
  divChamp.innerHTML = "";
  d3.select("#barChart").selectAll("svg").remove();
  //creer svg pour le graphique
  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // mettre nom des champions et leur score dans un tableau
  var dataTab = [];
  donnees.sort(function (a, b) {
    return b.Score - a.Score;
  });
  for (var i = 0; i <= 25; ++i) {
    //si le nom existe comme champion, ne pas rajouter dans le tableau
    if (!dataTab.some((e) => e.champion === donnees[i].Name)) {
      dataTab.push({
        champion: donnees[i].Name,
        score: donnees[i].Score,
      });
    }
  }

  console.log(dataTab);

  //mettre nom des champions dans des paragraphes
  for (var i = 0; i < dataTab.length; ++i) {
    var p = document.createElement("p");
    p.innerHTML = dataTab[i].champion;
    divChamp.appendChild(p);
  }

  // Largeur et hauteur du graphique
  var width = 1200;
  var height = 1000;

  // Création de l'échelle pour l'axe des x
  var x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataTab, function (d) {
        return d.score;
      }),
    ])
    .range([0, width]);

  // Création de l'échelle pour l'axe des y
  var y = d3
    .scaleBand()
    .domain(
      dataTab.map(function (d) {
        return d.champion;
      })
    )
    .range([0, height])
    .padding(0.1);

  // Création de l'élément SVG pour le graphique
  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Ajout des barres
  svg
    .selectAll("rect")
    .data(dataTab)
    .enter()
    .append("rect")
    //transition
    .transition()
    .duration(2000)
    .attr("y", function (d) {
      return y(d.champion);
    })
    .attr("width", function (d) {
      return x(d.score) / 1.5;
    })
    .attr("height", y.bandwidth());

  //ajoute score a droite
  svg
    .selectAll("text")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(d.score) / 1.47;
    })
    .attr("y", function (d) {
      return y(d.champion) + 20;
    })
    .text(function (d) {
      return d.score + "%";
    });

  //mettre rectangle en bleu
  d3.selectAll("rect").style("fill", "#025940");
  //mettre texte en blanc
  d3.selectAll("text").style("fill", "white");
}

function createBarChartBann(donnees) {
  //vider divChamp
  divChamp.innerHTML = "";
  //creer svg pour le graphique et suppression du graphique precedent
  d3.select("#barChart").selectAll("svg").remove();

  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // mettre nom des champions et leur score dans un tableau
  var dataTab = [];
  for (var i = 0; i < donnees.length; ++i) {
    //si le nom existe comme champion, ne pas rajouter dans le tableau
    if (!dataTab.some((e) => e.champion === donnees[i].Name)) {
      dataTab.push({
        champion: donnees[i].Name,
        bann: donnees[i].BanPerc,
      });
    }
  }

  //trier données par score
  dataTab.sort(function (a, b) {
    return b.bann - a.bann;
  });

  for (var i = 0; i < dataTab.length; ++i) {
    var p = document.createElement("p");
    p.innerHTML = dataTab[i].champion;
    divChamp.appendChild(p);
  }

  //afficher tableau dans la console
  console.log(dataTab);

  // Largeur et hauteur du graphique
  var width = 1200;
  var height = 5000;

  // Création de l'échelle pour l'axe des x
  var x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataTab, function (d) {
        return d.bann;
      }),
    ])
    .range([0, width]);

  // Création de l'échelle pour l'axe des y
  var y = d3
    .scaleBand()
    .domain(
      dataTab.map(function (d) {
        return d.champion;
      })
    )
    .range([0, height])
    .padding(0.1);

  // Création de l'élément SVG pour le graphique
  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Ajout des barres
  svg
    .selectAll("rect")
    .data(dataTab)
    .enter()
    .append("rect")
    .transition()
    .duration(2000)
    .attr("y", function (d) {
      return y(d.champion);
    })
    .attr("width", function (d) {
      return x(d.bann) / 1.5;
    })
    .attr("height", y.bandwidth());
  //ajoute score a droite des barres et champion a gauche
  svg
    .selectAll("text")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(d.bann) / 1.47;
    })
    .attr("y", function (d) {
      return y(d.champion) + 20;
    })
    .text(function (d) {
      return d.bann + "%";
    });

  //mettre rectangle en bleu
  d3.selectAll("rect").style("fill", "#044040");
  //mettre texte en blanc
  d3.selectAll("text").style("fill", "white");
}

function createBarChartPick(donnees) {
  //vider divChamp
  divChamp.innerHTML = "";
  //creer svg pour le graphique et suppression du graphique precedent
  d3.select("#barChart").selectAll("svg").remove();

  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // mettre nom des champions et leur score dans un tableau
  var dataTab = [];
  for (var i = 0; i < donnees.length; ++i) {
    //si le nom existe comme champion, ne pas rajouter dans le tableau
    if (!dataTab.some((e) => e.champion === donnees[i].Name)) {
      dataTab.push({
        champion: donnees[i].Name,
        pick: donnees[i].PickPerc,
      });
    }
  }
  //trier données par score
  dataTab.sort(function (a, b) {
    return b.pick - a.pick;
  });

  for (var i = 0; i < dataTab.length; ++i) {
    var p = document.createElement("p");
    p.innerHTML = dataTab[i].champion;
    divChamp.appendChild(p);
  }

  //afficher tableau dans la console
  console.log(dataTab);

  // Largeur et hauteur du graphique
  var width = 1200;
  var height = 5000;

  // Création de l'échelle pour l'axe des x
  var x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataTab, function (d) {
        return d.pick;
      }),
    ])
    .range([0, width]);

  // Création de l'échelle pour l'axe des y
  var y = d3
    .scaleBand()
    .domain(
      dataTab.map(function (d) {
        return d.champion;
      })
    )
    .range([0, height])
    .padding(0.1);

  // Création de l'élément SVG pour le graphique
  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Ajout des barres
  svg
    .selectAll("rect")
    .data(dataTab)
    .enter()
    .append("rect")
    .transition()
    .duration(2000)
    .attr("y", function (d) {
      return y(d.champion);
    })
    .attr("width", function (d) {
      return x(d.pick) / 1.5;
    })
    .attr("height", y.bandwidth());
  //ajoute score a droite des barres et champion a gauche
  svg
    .selectAll("text")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(d.pick) / 1.47;
    })
    .attr("y", function (d) {
      return y(d.champion) + 20;
    })
    .text(function (d) {
      //afficher champion et score
      return d.pick + "%";
    });

  //mettre rectangle en bleu
  d3.selectAll("rect").style("fill", "#62A632");
  //mettre texte en blanc
  d3.selectAll("text").style("fill", "white");
}

export { createBarChartScore, createBarChartBann, createBarChartPick };
