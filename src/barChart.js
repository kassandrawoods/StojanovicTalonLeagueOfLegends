import * as d3 from "d3";
import { csv } from "d3-fetch";

const divChamp = document.getElementById("titre");

function createBarChartScore(donnees, role) {
  divChamp.innerHTML = "LES 25 MEILLEURS CHAMPIONS " + role;
  d3.select("#barChart").selectAll("svg").remove();
  //creer svg pour le graphique
  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // mettre nom des champions et leur score dans un tableau

  donnees.sort(function (a, b) {
    return b.Score - a.Score;
  });

  var dataTot = [];
  var dataTab = [];

  for (var i = 0; i < donnees.length; i++) {
    //si le nom existe comme champion, ne pas rajouter dans le tableau
    if (
      !dataTot.some((e) => e.champion === donnees[i].Name) &&
      donnees[i].Role === role
    ) {
      dataTot.push({
        champion: donnees[i].Name,
        score: donnees[i].Score,
      });
    }
  }

  //remplir les 25 premiers champions du tableau
  for (var i = 0; i < 25; ++i) {
    dataTab.push(dataTot[i]);
  }

  console.log(dataTab);

  //mettre nom des champions dans des paragraphes
  /*for (var i = 0; i < dataTab.length; ++i) {
    var p = document.createElement("p");
    p.innerHTML = dataTab[i].champion;
    divChamp.appendChild(p);
  }
*/
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
    //transitions
    .transition()
    .duration(800)
    .delay(function (d, i) {
      return i * 100;
    })

    .attr("y", function (d) {
      return y(d.champion);
    })
    .attr("width", function (d) {
      return x(d.score) / 1.5;
    })
    .attr("height", y.bandwidth());
  svg
    .selectAll("text")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(0);
    })
    .attr("y", function (d) {
      return y(d.champion) + 20;
    })
    .text(function (d) {
      return d.champion;
    });

  //ajoute score a droite
  svg
    .selectAll(".label")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("class", "label")
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

function createBarChartBann(donnees, role) {
  divChamp.innerHTML = "LES 25 CHAMPIONS " + role + " LES PLUS BANNIS";
  //creer svg pour le graphique et suppression du graphique precedent
  d3.select("#barChart").selectAll("svg").remove();

  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // mettre nom des champions et leur score dans un tableau
  //trier tableau par BanPerc
  //trier par BanPerc
  donnees.sort(function (a, b) {
    return b.BanPerc - a.BanPerc;
  });

  var dataTot = [];
  var dataTab = [];

  for (var i = 0; i < donnees.length; i++) {
    //si le nom existe comme champion, ne pas rajouter dans le tableau
    if (
      !dataTot.some((e) => e.champion === donnees[i].Name) &&
      donnees[i].Role === role
    ) {
      dataTot.push({
        champion: donnees[i].Name,
        bann: donnees[i].BanPerc,
      });
    }
  }

  //remplir les 25 premiers champions du tableau
  for (var i = 0; i < 25; ++i) {
    dataTab.push(dataTot[i]);
  }

  //afficher tableau dans la console
  console.log(dataTab);

  // Largeur et hauteur du graphique
  var width = 1200;
  var height = 1000;

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
    .duration(800)
    .delay(function (d, i) {
      return i * 100;
    })
    .attr("y", function (d) {
      return y(d.champion);
    })
    .attr("width", function (d) {
      return x(d.bann) / 1.5;
    })
    .attr("height", y.bandwidth());

  svg
    .selectAll("text")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(0);
    })
    .attr("y", function (d) {
      return y(d.champion) + 20;
    })
    .text(function (d) {
      return d.champion;
    });

  svg
    .selectAll(".label")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("class", "label")
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

function createBarChartPick(donnees, role) {
  //creer svg pour le graphique et suppression du graphique precedent
  d3.select("#barChart").selectAll("svg").remove();
  divChamp.innerHTML = "LES 25 CHAMPIONS " + role + " LES PLUS PICKS";

  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //trier par PickPerc
  donnees.sort(function (a, b) {
    return b.PickPerc - a.PickPerc;
  });

  // mettre nom des champions et leur score dans un tableau
  var dataTot = [];
  var dataTab = [];
  for (var i = 0; i < donnees.length; ++i) {
    //si le nom existe comme champion, ne pas rajouter dans le tableau
    if (
      !dataTot.some((e) => e.champion === donnees[i].Name) &&
      donnees[i].Role === role
    ) {
      dataTot.push({
        champion: donnees[i].Name,
        pick: donnees[i].PickPerc,
      });
    }
  }

  //mettre les 25 premiers champions dans le tableau
  for (var i = 0; i < 25; ++i) {
    dataTab.push(dataTot[i]);
  }

  //afficher tableau dans la console
  console.log(dataTab);

  // Largeur et hauteur du graphique
  var width = 1200;
  var height = 1000;

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
    .delay(function (d, i) {
      return i * 100;
    })
    .attr("y", function (d) {
      return y(d.champion);
    })
    .attr("width", function (d) {
      return x(d.pick) / 1.5;
    })
    .attr("height", y.bandwidth());

  //nom champion
  svg
    .selectAll("text")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(0);
    })
    .attr("y", function (d) {
      return y(d.champion) + 20;
    })
    .text(function (d) {
      return d.champion;
    });
  //ajoute score a droite des barres et champion a gauche
  svg
    .selectAll(".label")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("class", "label")
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

function createBarCharWinrate(donnees, role) {
  //creer svg pour le graphique et suppression du graphique precedent
  d3.select("#barChart").selectAll("svg").remove();
  divChamp.innerHTML = "LES 25 CHAMPIONS " + role + " QUI GAGNENT LE PLUS";

  var svg = d3
    .select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //trier par PickPerc
  donnees.sort(function (a, b) {
    return b.WinPerc - a.WinPerc;
  });

  // mettre nom des champions et leur score dans un tableau
  var dataTot = [];
  var dataTab = [];
  for (var i = 0; i < donnees.length; ++i) {
    //si le nom existe comme champion, ne pas rajouter dans le tableau
    if (
      !dataTot.some((e) => e.champion === donnees[i].Name) &&
      donnees[i].Role === role
    ) {
      dataTot.push({
        champion: donnees[i].Name,
        winrate: donnees[i].WinPerc,
      });
    }
  }

  //mettre les 25 premiers champions dans le tableau
  for (var i = 0; i < 25; ++i) {
    dataTab.push(dataTot[i]);
  }

  //afficher tableau dans la console
  console.log(dataTab);

  // Largeur et hauteur du graphique
  var width = 1200;
  var height = 1000;

  // Création de l'échelle pour l'axe des x
  var x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataTab, function (d) {
        return d.winrate;
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
    .delay(function (d, i) {
      return i * 100;
    })
    .attr("y", function (d) {
      return y(d.champion);
    })
    .attr("width", function (d) {
      return x(d.winrate) / 1.5;
    })
    .attr("height", y.bandwidth());


    function getImgSrc(championName) {
      // Format the championName to match the image file name conventions
      var formattedChampionName = championName.toLowerCase().replace(/ /g, '_');
    
      // Construct the image file path using the formatted championName and the directory name
      var imgSrc = `/img/lol_images_champion/${formattedChampionName}.jpg`;
    
      return imgSrc;
    }
    
  //nom champion
  svg
    .selectAll("text")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(0);
    })
    .attr("y", function (d) {
      return y(d.champion) + 20;
    })
    .text(function (d) {
      return d.champion;
    });
  //ajoute score a droite des barres et champion a gauche
  svg
    .selectAll(".label")
    .data(dataTab)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", function (d) {
      return x(d.winrate) / 1.47;
    })
    .attr("y", function (d) {
      return y(d.champion) + 20;
    })
    .text(function (d) {
      //afficher champion et score
      return d.winrate + "%";
    });

  //mettre rectangle en bleu
  d3.selectAll("rect").style("fill", "#457324");
  //mettre texte en blanc
  d3.selectAll("text").style("fill", "white");
}

export {
  createBarChartScore,
  createBarChartBann,
  createBarChartPick,
  createBarCharWinrate,
};
