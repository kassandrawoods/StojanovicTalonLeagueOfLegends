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

const btnScore = document.getElementById("score");
const btnBann = document.getElementById("ban");
const btnPick = document.getElementById("pick");

const titre = document.getElementById("titre");

const btnTop = document.getElementById("top");
const btnSupport = document.getElementById("support");
const btnMid = document.getElementById("mid");
const btnJungle = document.getElementById("jungle");
const btnAdc = document.getElementById("adc");

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

    btnTop.addEventListener("click", function () {
      topBarchart(cleanData);
    });

    btnAdc.addEventListener("click", function () {
      adcBarchart(cleanData);
    });
    btnSupport.addEventListener("click", function () {
      supportBarchart(cleanData);
    });
    btnMid.addEventListener("click", function () {
      midBarchart(cleanData);
    });
    btnJungle.addEventListener("click", function () {
      jungleBarchart(cleanData);
    });
  });
