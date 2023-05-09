import * as d3 from "d3";
import { csv } from "d3-fetch";

import {
  createBarChartScore,
  createBarChartBann,
  createBarChartPick,
} from "./barChart";

const btnTop = document.getElementById("top-role");
const boutonStats = document.getElementById("boutonStats");
const barChart = document.getElementById("barChart");
const titre = document.getElementById("titre");

function topBarchart(donnees) {
  boutonStats.style.visibility = "visible";
  d3.select("#barChart").selectAll("svg").remove();

  const btnScore = document.getElementById("score");
  //si clique sur btnScore, afficher graphique score
  btnScore.addEventListener("click", function () {
    createBarChartScore(donnees, "TOP");
  });

  const btnPick = document.getElementById("pick");
  btnPick.addEventListener("click", function () {
    createBarChartPick(donnees, "TOP");
  });

  const btnBann = document.getElementById("ban");
  btnBann.addEventListener("click", function () {
    createBarChartBann(donnees, "TOP");
  });
}

function adcBarchart(donnees) {
  boutonStats.style.visibility = "visible";
  d3.select("#barChart").selectAll("svg").remove();

  const btnScore = document.getElementById("score");
  //si clique sur btnScore, afficher graphique score
  btnScore.addEventListener("click", function () {
    createBarChartScore(donnees, "ADC");
  });

  const btnPick = document.getElementById("pick");
  btnPick.addEventListener("click", function () {
    createBarChartPick(donnees, "ADC");
  });

  const btnBann = document.getElementById("ban");
  btnBann.addEventListener("click", function () {
    createBarChartBann(donnees, "ADC");
  });
}

function supportBarchart(donnees) {
  boutonStats.style.visibility = "visible";
  d3.select("#barChart").selectAll("svg").remove();

  const btnScore = document.getElementById("score");
  //si clique sur btnScore, afficher graphique score
  btnScore.addEventListener("click", function () {
    createBarChartScore(donnees, "SUPPORT");
  });

  const btnPick = document.getElementById("pick");
  btnPick.addEventListener("click", function () {
    createBarChartPick(donnees, "SUPPORT");
  });

  const btnBann = document.getElementById("ban");
  btnBann.addEventListener("click", function () {
    createBarChartBann(donnees, "SUPPORT");
  });
}

function jungleBarchart(donnees) {
  boutonStats.style.visibility = "visible";
  d3.select("#barChart").selectAll("svg").remove();

  const btnScore = document.getElementById("score");
  //si clique sur btnScore, afficher graphique score
  btnScore.addEventListener("click", function () {
    createBarChartScore(donnees, "JUNGLE");
  });

  const btnPick = document.getElementById("pick");
  btnPick.addEventListener("click", function () {
    createBarChartPick(donnees, "JUNGLE");
  });

  const btnBann = document.getElementById("ban");
  btnBann.addEventListener("click", function () {
    createBarChartBann(donnees, "JUNGLE");
  });
}

function midBarchart(donnees) {
  boutonStats.style.visibility = "visible";
  d3.select("#barChart").selectAll("svg").remove();

  const btnScore = document.getElementById("score");
  //si clique sur btnScore, afficher graphique score
  btnScore.addEventListener("click", function () {
    createBarChartScore(donnees, "MID");
  });

  const btnPick = document.getElementById("pick");
  btnPick.addEventListener("click", function () {
    createBarChartPick(donnees, "MID");
  });

  const btnBann = document.getElementById("ban");
  btnBann.addEventListener("click", function () {
    createBarChartBann(donnees, "MID");
  });
}

export {
  topBarchart,
  adcBarchart,
  supportBarchart,
  jungleBarchart,
  midBarchart,
};
