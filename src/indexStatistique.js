import * as d3 from "d3";
import { csv } from "d3-fetch";



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

    // Données pour le radar chart
    const data = [
      { category: "Catégorie 1", value: 0.8 },
      { category: "Catégorie 2", value: 0.6 },
      { category: "Catégorie 3", value: 0.9 },
      { category: "Catégorie 4", value: 0.7 },
      { category: "Catégorie 5", value: 0.5 },
      { category: "Catégorie 6", value: 0.4 }
    ];

    // Dimensions pour le radar chart
    const width = 580;
    const height = 580;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Calcule le rayon maximal du radar chart
    const maxRadius = Math.min(width, height) / 2 - Math.max(margin.top, margin.bottom);

    // Calcule les coordonnées polaires pour chaque donnée
    const angleSlice = Math.PI * 2 / data.length;
    const coordinates = data.map((d, i) => {
      const angle = angleSlice * i;
      const radius = maxRadius * d.value;
      return [radius * Math.sin(angle), -radius * Math.cos(angle)];
    });

    // Crée l'échelle pour les catégories
    const categories = data.map(d => d.category);
    const angleScale = d3.scaleBand()
      .range([0, Math.PI * 2])
      .domain(categories);

    // Crée l'échelle pour les valeurs
    const valueScale = d3.scaleLinear()
      .range([0, maxRadius])
      .domain([0, 1]);

    // Crée l'élément SVG pour le radar chart
    const svg = d3.select("#radarChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Crée un groupe pour le radar chart
    const chartGroup = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Ajoute un cercle pour chaque niveau de valeur
    chartGroup.selectAll(".level")
      .data(d3.range(1, 6))
      .enter()
      .append("circle")
      .attr("class", "level")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", d => maxRadius / 5 * d)
      .style("fill", "none")
      .style("stroke", "gray");

    // Ajoute une ligne pour chaque catégorie
    chartGroup.selectAll(".radar-line")
      .data(coordinates)
      .enter()
      .append("line")
      .attr("class", "radar-line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", d => d[0])
      .attr("y2", d => d[1])
      .style("stroke", "blue")
      .style("stroke-width", "3px");

    // Ajoute un cercle pour chaque catégorie
    chartGroup.selectAll(".radar-point")
      .data(coordinates)
      .enter()
      .append("circle")
      .attr("class", "radar-point")
      .attr("cx", d => d[0])
      .attr("cy", d => d[1])
      .attr("r", 5)
      .style("fill", "blue");

      // Ajoute le texte pour chaque catégorie
      chartGroup.selectAll(".radar-label")
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
      .text(d => d)
      .attr("text-anchor", (d, i) => {
      const angle = angleScale(d);
      if (angle === Math.PI / 2) {
      return "middle";
      } else if (angle > Math.PI / 2 && angle < Math.PI * 3 / 2) {
      return "end";
      } else {
      return "start";
      }
      })
      .attr("alignment-baseline", (d, i) => {
      const angle = angleScale(d);
      if (angle === Math.PI / 2) {
      return "middle";
      } else if (angle > Math.PI / 2 && angle < Math.PI * 3 / 2) {
      return "baseline";
      } else {
      return "hanging";
      }
      })
      .style("font-size", "14px")
      .style("fill", "black")
      .style("text-transform", "uppercase")
      .style("letter-spacing", "1px");