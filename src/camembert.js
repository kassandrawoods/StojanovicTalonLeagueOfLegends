import * as d3 from "d3";
import { csv } from "d3-fetch";

function createCamembert(donnees) {
  var nbTop = 0;
  var nbAdc = 0;
  var nbJungle = 0;
  var nbSupport = 0;
  var nbMid = 0;

  for (var i = 0; i < donnees.length; ++i) {
    if (donnees[i].Role == "TOP") nbTop++;
    if (donnees[i].Role == "ADC") nbAdc++;
    if (donnees[i].Role == "JUNGLE") nbJungle++;
    if (donnees[i].Role == "SUPPORT") nbSupport++;
    if (donnees[i].Role == "MID") nbMid++;
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
    .range(["#044040", "#308C83", "#025940", "#62A632", "#457324"]);

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
      return d.data.label;
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
      .attr("d", d3.arc().outerRadius(radius).innerRadius(0))
      .select("text")
      .text(function (d) {
        return d.data.label + " " + d.data.value + "%";
      });
    d3.select(this)
      .select("text")
      .text(function (d) {
        return d.data.value + "%";
      });
  });

  g.on("mouseout", function (d) {
    d3.select(this).select("path").transition().duration(500).attr("d", arc);
    d3.select(this)
      .select("text")
      .text(function (d) {
        return d.data.label;
      });
    d3.selectAll("text").style("font-size", "15px");
  });

  //centrer le texte sur la tranche de données
  d3.selectAll("text").attr("text-anchor", "middle");
}

export { createCamembert };
