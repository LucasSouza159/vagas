const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector("button");
const resultsList = document.querySelector(".results");

function displayResults(results) {
  resultsList.innerHTML = "";

  for (let i = 0; i < results.length; i++) {
    const result = results[i];

    const li = document.createElement("li");

    const h2 = document.createElement("h2");
    h2.textContent = result.title;
    li.appendChild(h2);

    if (result.salary) {
      const p = document.createElement("p");
      p.textContent = `Salário: ${result.salary}`;
      li.appendChild(p);
    }

    const p = document.createElement("p");
    p.textContent = result.description;
    li.appendChild(p);
    const date = new Date(result.created);
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const timeString = `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;

    const p2 = document.createElement("p");
    p2.textContent = `Publicado em ${dateString} às ${timeString}`;
    li.appendChild(p2);

    const a = document.createElement("a");
    a.href = result.redirect_url;
    a.textContent = "Ver mais";
    a.target = "_blank";
    li.appendChild(a);

    resultsList.appendChild(li);
  }
}

function searchJobs() {
  const searchTerm = searchInput.value;

  fetch(
    `https://api.adzuna.com/v1/api/jobs/br/search/1?app_id=a4f29f2f&app_key=09a44813ecf2fbf9cf55e24c92d93779&results_per_page=10&what=${searchTerm}&content-type=application/json`
  )
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      displayResults(results);
    })
    .catch((error) => {
      console.error(error);
      resultsList.innerHTML = "<li>Erro ao pesquisar vagas</li>";
    });
}

searchButton.addEventListener("click", searchJobs);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchJobs();
  }
});
