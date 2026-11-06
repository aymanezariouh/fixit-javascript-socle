import "./style.css";
import heroImg from "./assets/hero.png";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import { setupCounter } from "./counter.js";
import initialRepairs from "./data.js";

function loadRepairs(initialRepairs) {
  const savedText = localStorage.getItem("fixit-repairs");
  if (savedText === null) return initialRepairs;
  return JSON.parse(savedText);
}

function saveRepairs(repairs) {
  localStorage.setItem("fixit-repairs", JSON.stringify(repairs));
}

let repairesTemp = loadRepairs(initialRepairs);
const deviceInput = document.querySelector("#device");
const repaireContainer = document.querySelector(".repairList");
const selector = document.querySelector("#status");
const counter = document.querySelector(".ccounter");
///=================functions==================
function renderRepairs(visibleRepairs) {
  repaireContainer.innerHTML = "";
  visibleRepairs.forEach((repaire) => {
    const p = document.createElement("p");
    const btn = document.createElement("button");
    p.textContent = `${repaire.device} ,${repaire.status} `;
    repaireContainer.appendChild(p);
    btn.textContent = "terminer";
    btn.addEventListener("click", () => {
      repairesTemp = changeStatus(repairesTemp, repaire.id);
      saveRepairs(repairesTemp);
      renderRepairs(filterRepairs(repairesTemp, selector.value));
    });
    repaireContainer.appendChild(btn);
  });
  if (visibleRepairs.length.length === 0) {
    repaireContainer.textContent = "Aucune réparation";
  }
  counter.textContent = visibleRepairs.length;
}
renderRepairs(repairesTemp);

function filterRepairs(visibleRepairs, status) {
  if (status === "tous") {
    return visibleRepairs;
  }
  return visibleRepairs.filter((item) => item.status === status);
}
function addRepair(repairs, deviceN) {
  if (!deviceN.trim()) return;
  const id = crypto.randomUUID();
  const device = deviceN.trim();
  const newA = {
    id,
    device,
    status: "recu",
  };
  return [...repairs, newA];
}
function changeStatus(repairs, id) {
  return repairs.map((repair) => {
    if (repair.id === id) {
      return {
        id: repair.id,
        device: repair.device,
        status: "termine",
      };
    }

    return repair;
  });
}
changeStatus(repairesTemp, "R2");

///=============event listeners ==================

selector.addEventListener("change", () => {
  const results = filterRepairs(repairesTemp, selector.value);
  renderRepairs(results);
});
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!deviceInput.value.trim()) return;
  repairesTemp = addRepair(repairesTemp, deviceInput.value);
  saveRepairs(repairesTemp);
  renderRepairs(filterRepairs(repairesTemp, selector.value));
  deviceInput.value = "";
});
