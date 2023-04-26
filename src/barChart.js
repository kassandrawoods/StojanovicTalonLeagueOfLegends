import * as d3 from "d3";
import { csv } from "d3-fetch";

function createBarChart(donnees) {
  //creer svg pour le graphique
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
        score: donnees[i].Score,
      });
    }
  }

  //afficher tableau dans la console
  console.log(dataTab);

  // Largeur et hauteur du graphique
  var width = 1000;
  var height = 5000;

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
    .attr("y", function (d) {
      return y(d.champion);
    })
    .attr("width", function (d) {
      return x(d.score);
    })
    .attr("height", y.bandwidth());

  // Ajout des labels
  svg
    .selectAll("text")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("y", function (d) {
      return y(d.champion) + y.bandwidth() / 2;
    })
    .attr("x", function (d) {
      return x(d.score) - 5;
    })
    .attr("dy", ".35em")
    .text(function (d) {
      return d.score;
    });

  //mettre rectangle en bleu
  d3.selectAll("rect").style("fill", "rgb(11, 30, 227)");
  //mettre texte en blanc
  d3.selectAll("text").style("fill", "white");
}

export { createBarChart };
