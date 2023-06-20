console.log("JavaScript is working!");

async function init() {
  const name = document.getElementById("countries");
  const countries = await getCountryData("https://restcountries.com/v3.1/all");
  sortedCountries = sortContries(countries);
  for (let i = 0; i < sortedCountries.length; i++) {
    const trname = document.createElement("tr");
    const flagurl = sortedCountries[i].flags;
    let language = null;
    if (
      sortedCountries[i].languages &&
      Object.values(sortedCountries[i].languages).length > 0
    ) {
      language = Object.values(sortedCountries[i].languages)[0];
    } else {
      language = "No official language";
    }
    trname.innerHTML = `<td><img src="${flagurl.png}" width=100px;></td><td>${sortedCountries[i].name.common}</td><td>${sortedCountries[i].capital}</td><td>${sortedCountries[i].region}</td><td>${sortedCountries[i].population}</td><td>${language}</td>`;
    name.append(trname);
  }
}

async function getCountryData(url) {
  try {
    let response = await fetch(url);
    let country = await response.json();
    return country;
  } catch (err) {
    console.error("Error: ", err);
  }
}

const input = document.getElementById("input");
input.addEventListener("input", () => {
  if(input.value === "") {
    init(); 
    return;
  }
  const name = document.getElementById("countries");
  name.innerHTML = "";

  for (let i = 0; i < sortedCountries.length; i++) {
    if (sortedCountries[i].name.common.toLowerCase().includes(input.value.toLowerCase())) {
      const trname = document.createElement("tr");
      const flagurl = sortedCountries[i].flags;
      let language = null;
      if (
        sortedCountries[i].languages &&
        Object.values(sortedCountries[i].languages).length > 0
      ) {
        language = Object.values(sortedCountries[i].languages)[0];
      } else {
        language = "No official language";
      }
      trname.innerHTML = `<td><img src="${flagurl.png}" width=100px;></td><td>${sortedCountries[i].name.common}</td><td>${sortedCountries[i].capital}</td><td>${sortedCountries[i].region}</td><td>${sortedCountries[i].population}</td><td>${language}</td>`;
      name.append(trname);
    }
  }
})

function sortContries(countries) {
  const sortedCountries = countries.sort((a, b) => {
    const nameA = a.name.common.toUpperCase();
    const nameB = b.name.common.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return sortedCountries;
}

init();
