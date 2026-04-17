function entrer() {
  document.getElementById("home").style.display = "none";
  document.getElementById("app").style.display = "block";
  chargerSauvegarde();
}

// ➕ AJOUT MATIÈRE
function ajouterMatiere(nom = "", d1 = "", d2 = "", compo = "", coef = "") {
  let div = document.createElement("div");
  div.classList.add("matiere");

  div.innerHTML = `
    <input class="nom" type="text" placeholder="Matière" value="${nom}">

    <div class="row">
      <input type="number" placeholder="D1" value="${d1}">
      <input type="number" placeholder="D2" value="${d2}">
      <input type="number" placeholder="Compo" value="${compo}">
      <input type="number" placeholder="Coef" value="${coef}">
    </div>

    <div class="moyenne-matiere">Moyenne: --</div>
  `;

  document.getElementById("container").appendChild(div);
}
function ajouterMatiere(nom = "", d1 = "", d2 = "", compo = "", coef = "") {
  let div = document.createElement("div");
  div.classList.add("matiere");

  div.innerHTML = `
    <input class="nom" type="text" placeholder="Matière" value="${nom}">

    <div class="row">
      <input type="number" placeholder="D1" value="${d1}">
      <input type="number" placeholder="D2" value="${d2}">
      <input type="number" placeholder="Compo" value="${compo}">
      <input type="number" placeholder="Coef" value="${coef}">
    </div>

    <div class="moyenne-matiere">Moyenne: --</div>

    <button class="delete-btn" onclick="supprimerMatiere(this)">Supprimer</button>
  `;

  document.getElementById("container").appendChild(div);
}

// 📊 CALCUL
function calculer() {

  let blocks = document.querySelectorAll(".matiere");

  let total = 0;
  let totalCoef = 0;
  let totalPoints = 0; // 🔥 TOTAL DES POINTS

  blocks.forEach(b => {

    let i = b.querySelectorAll("input");

    let d1 = parseFloat(i[1].value);
    let d2 = parseFloat(i[2].value);
    let compo = parseFloat(i[3].value);
    let coef = parseFloat(i[4].value);

    let notes = [];

    if (!isNaN(d1)) notes.push(d1);
    if (!isNaN(d2)) notes.push(d2);
    if (!isNaN(compo)) notes.push(compo);

    let moyenneMatiere = notes.length
      ? notes.reduce((a, b) => a + b, 0) / notes.length
      : 0;

    // 🔥 AFFICHAGE MOYENNE MATIÈRE
    let affichage = b.querySelector(".moyenne-matiere");
    affichage.innerText = "Moyenne: " + moyenneMatiere.toFixed(2);

    affichage.classList.remove("rouge", "orange", "vert");

    if (moyenneMatiere < 10) affichage.classList.add("rouge");
    else if (moyenneMatiere < 14) affichage.classList.add("orange");
    else affichage.classList.add("vert");

    // 🔥 CALCUL TOTAL DES POINTS
    if (!isNaN(coef)) {
      total += moyenneMatiere * coef;
      totalCoef += coef;
      totalPoints += moyenneMatiere * coef;
    }
  });

  let moyenne = totalCoef ? total / totalCoef : 0;

  document.getElementById("moyenne").innerText = moyenne.toFixed(2);

  // 🎯 MENTION
  let mention = "";

  if (moyenne < 10) mention = "Insuffisant ❌";
  else if (moyenne < 14) mention = "Passable ⚠️";
  else if (moyenne < 16) mention = "Bien 👍";
  else mention = "Excellent 🏆";

  document.getElementById("mention").innerText = mention;

  // 📊 AFFICHAGE TOTAL POINTS
  document.getElementById("totalPoints").innerText =
    "Total des points : " + totalPoints.toFixed(2);

  sauvegarder();
}

// 💾 SAUVEGARDE
function sauvegarder() {
  let data = [];

  document.querySelectorAll(".matiere").forEach(m => {
    let i = m.querySelectorAll("input");

    data.push({
      nom: i[0].value,
      d1: i[1].value,
      d2: i[2].value,
      compo: i[3].value,
      coef: i[4].value
    });
  });

  localStorage.setItem("cms_data", JSON.stringify(data));
}

// 📥 CHARGEMENT
function chargerSauvegarde() {
  let data = JSON.parse(localStorage.getItem("cms_data")) || [];

  data.forEach(d => {
    ajouterMatiere(d.nom, d.d1, d.d2, d.compo, d.coef);
  });
}
function supprimerMatiere(btn) {
  btn.parentElement.remove();
}
function resetCMS() {
  if (confirm("Voulez-vous vraiment tout réinitialiser ?")) {

    // vider les matières
    document.getElementById("container").innerHTML = "";

    // reset affichage
    document.getElementById("moyenne").innerText = "--";
    document.getElementById("mention").innerText = "";
    document.getElementById("totalPoints").innerText = "Total des points : --";

    // vider sauvegarde
    localStorage.clear();
  }
}