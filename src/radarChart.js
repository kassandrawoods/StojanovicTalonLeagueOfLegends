import * as d3 from "d3";
import { csv } from "d3-fetch";

function createRadarChart(donnees) {
  var nbFighter = 0;
  var nbTank = 0;
  var nbMage = 0;
  var nbAssassin = 0;
  var nbMarksman = 0;
  var nbSupportClass = 0;

  for (var i = 0; i < donnees.length; ++i) {
    if (donnees[i].Class == "Fighter") nbFighter++;
    if (donnees[i].Class == "Tank") nbTank++;
    if (donnees[i].Class == "Mage") nbMage++;
    if (donnees[i].Class == "Assassin") nbAssassin++;
    if (donnees[i].Class == "Marksman") nbMarksman++;
    if (donnees[i].Class == "Support") nbSupportClass++;
  }

  const totRole =
    nbFighter + nbTank + nbMage + nbAssassin + nbMarksman + nbSupportClass;
  var prcFighter = nbFighter / totRole;
  console.log("prcFighter: " + prcFighter);
  var prcTank = nbTank / totRole;
  var prcMage = nbMage / totRole;
  var prcAssassin = nbAssassin / totRole;
  var prcMarksman = nbMarksman / totRole;
  var prcSupportClass = nbSupportClass / totRole;

  const tank = Math.round(prcTank * 100);
  const fighter = Math.round(prcFighter * 100);
  const mage = Math.round(prcMage * 100);
  const assassin = Math.round(prcAssassin * 100);
  const marksman = Math.round(prcMarksman * 100);
  const support = Math.round(prcSupportClass * 100);

  //faire x2 les valeurs pour avoir un radar chart plus grand
  prcFighter = prcFighter * 3;
  prcTank = prcTank * 3;
  prcMage = prcMage * 3;
  prcAssassin = prcAssassin * 3;
  prcMarksman = prcMarksman * 3;
  prcSupportClass = prcSupportClass * 3;

  const dataCategory = [
    { category: "Fighter", value: prcFighter, pourcentage: fighter },
    { category: "Tank", value: prcTank, pourcentage: tank },
    { category: "Mage", value: prcMage, pourcentage: mage },
    { category: "Assassin", value: prcAssassin, pourcentage: assassin },
    { category: "Marksman", value: prcMarksman, pourcentage: marksman },
    { category: "Support", value: prcSupportClass, pourcentage: support },
  ];

  // Dimensions pour le radar chart
  const width = 580;
  const height = 580;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  //mettre pourcentage dans un tableau

  // Calcule le rayon maximal du radar chart
  const maxRadius =
    Math.min(width, height) / 2 - Math.max(margin.top, margin.bottom);

  // Calcule les coordonnées polaires pour chaque donnée
  const angleSlice = (Math.PI * 2) / dataCategory.length;
  const coordinates = dataCategory.map((d, i) => {
    const angle = angleSlice * i;
    const radius = maxRadius * d.value;
    return [radius * Math.sin(angle), -radius * Math.cos(angle)];
  });

  // Crée l'échelle pour les catégories

  const categories = dataCategory.map((d) => d.category);
  const angleScale = d3
    .scaleBand()
    .range([0, Math.PI * 2])
    .domain(categories);

  // Crée l'échelle pour les valeurs
  const valueScale = d3.scaleLinear().range([0, maxRadius]).domain([0, 1]);

  // Crée l'élément SVG pour le radar chart
  const svg = d3
    .select("#radarChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Crée un groupe pour le radar chart
  const chartGroup = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Ajoute un cercle pour chaque niveau de valeur
  chartGroup
    .selectAll(".level")
    .data(d3.range(1, 6))
    .enter()
    .append("circle")
    .attr("class", "level")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", (d) => (maxRadius / 5) * d)
    .style("fill", "none")
    .style("stroke", "gray");

  // Ajoute une ligne pour chaque catégorie
  chartGroup
    .selectAll(".radar-line")
    .data(coordinates)
    .enter()
    .append("line")
    .attr("class", "radar-line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (d) => d[0])
    .attr("y2", (d) => d[1])
    .style("stroke", "blue")
    .style("stroke-width", "3px");

  // Ajoute un cercle pour chaque catégorie
  chartGroup
    .selectAll(".radar-point")
    .data(coordinates)
    .enter()
    .append("circle")
    .attr("class", "radar-point")
    .attr("cx", (d) => d[0])
    .attr("cy", (d) => d[1])
    .attr("r", 5)
    .style("fill", "blue");

  // Ajoute le texte pour chaque catégorie
  chartGroup
    .selectAll(".radar-label")
    .data(categories)
    .enter()
    .append("text")
    .attr("class", "radar-label")
    .attr("x", (d, i) => {
      const angle = angleScale(d);
      const radius = maxRadius * 1.1;
      return radius * Math.sin(angle);
    })
    .attr("y", (d, i) => {
      const angle = angleScale(d);
      const radius = maxRadius * 1.1;
      return -radius * Math.cos(angle);
    })
    .text((d) => d)
    .attr("text-anchor", (d, i) => {
      const angle = angleScale(d);
      if (angle === Math.PI / 2) {
        return "middle";
      } else if (angle > Math.PI / 2 && angle < (Math.PI * 3) / 2) {
        return "end";
      } else {
        return "start";
      }
    })
    .attr("alignment-baseline", (d, i) => {
      const angle = angleScale(d);
      if (angle === Math.PI / 2) {
        return "middle";
      } else if (angle > Math.PI / 2 && angle < (Math.PI * 3) / 2) {
        return "baseline";
      } else {
        return "hanging";
      }
    })
    .style("font-size", "14px")
    .style("fill", "white")
    .style("text-transform", "uppercase")
    .style("letter-spacing", "1px");
}

export { createRadarChart };
