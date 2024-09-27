// Grab fetchbutton and add an eventlistener to it
const fetchButton = document.querySelector("#fetchButton");

async function fetchRecipeList() {
  // grab recipies container and clear the previous content
  const resultContainer = document.querySelector("#result");
  resultContainer.innerHTML = "";

  // fetch the recipe data from the backend
  // link to get recipes prepared under 30mins
  const url =
    "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "fe5d99a2admsh11d07c689fc440cp1172a9jsna9d8e1a12923",
      "x-rapidapi-host": "tasty.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    const data = result.results;

    console.log("REcipe data ---->", data);

    // display the result to the user
    // 1. clear result container
    resultContainer.innerHTML = "";

    // 2. check if data actually contains items
    if (data.length <= 0) {
      // create an html message to show the user no recipes found
      resultContainer.innerHTML = "No recipes found";
      return;
    }

    // 3. for each of the items create an html element to show the data.
    data.forEach((data) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.thumbnail_url}" alt="recipe image" />
      <p>${data.description}</p>`;

      // Check if keywords exist and are not null or undefined
  if (data.keywords) {
    recipeDiv.innerHTML += `
      <h4>Keywords:</h4>
      <p>${data.keywords}</p>
    `;
  }
     recipeDiv.innerHTML += ` <a href="${data.original_video_url}">click to watch</a>
      `;

      //4. push each element into the resultContiainer
      resultContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    console.log("Error while fetching data--->", error);
  }
}

fetchButton.addEventListener("click", fetchRecipeList);
