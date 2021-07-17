const formElement = $("#form");
const inputElement = $("#superhero-input");
console.log(formElement);

formElement.submit(function (event) {
  event.preventDefault();
  console.log("submit");
  const idSuperhero = inputElement.val();

  $.ajax({
    type: "GET",
    datatype: "json",
    url: `https://www.superheroapi.com/api.php/10158423431493063/${idSuperhero}`,
  }).done(function (superhero) {
    console.log(superhero);
    console.log(superhero.response);
    if (superhero.response === "error") {
      alert(
        "El número ingresado no arrojó ningún resultado.\nFavor intente nuevamente con otro número :)"
      );
    } else {
      $("#main-content").show();
      let heroImage = superhero.image.url;
      $("#hero-image").attr("src", superhero.image.url);
      $("#hero-name").text(superhero.name);
      $("#hero-connections").text(superhero.connections["group-affiliation"]);
      $("#hero-publisher").text(superhero.biography.publisher);
      $("#hero-occupation").text(superhero.work.occupation);
      $("#hero-first-appearance").text(superhero.biography["first-appearance"]);
      $("#hero-height-inch").text(superhero.appearance.height[0]);
      $("#hero-height-cm").text(superhero.appearance.height[1]);
      $("#hero-weight-lb").text(superhero.appearance.weight[0]);
      $("#hero-weight-kg").text(superhero.appearance.weight[1]);
      $("#hero-aliases").text(superhero.biography.aliases.join(" - "));
      // superhero.biography.aliases.forEach((aliase) => {
      //   $("#hero-aliases").append(`${aliase} `);
      // });

      // chartJS DataPoints

      console.log(superhero.powerstats);

      let powerstatsKeys = Object.keys(superhero.powerstats);
      console.log(powerstatsKeys);

      let powerstatsValues = Object.values(superhero.powerstats);
      console.log(powerstatsValues);

      //ChartJS starts
      document.querySelector("#chartContainer").innerHTML =
        '<canvas id="powerstatsChart"></canvas>';

      var ctx = document.getElementById("powerstatsChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: powerstatsKeys,
          datasets: [
            {
              label: `Puntaje`,
              data: powerstatsValues,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          // scales: {
          //   y: {
          //     beginAtZero: true,
          //   },
          // },
          plugins: {
            title: {
              display: true,
              font: {
                size: 18,
              },
              text: `Estadísticas de Poder para ${superhero.name}`,
            },
            legend: {
              labels: {
                font: {
                  size: 14,
                },
                padding: 5,
              },
            },
          },
        },
      });
      //ChartJS ends
    }
  });
});
