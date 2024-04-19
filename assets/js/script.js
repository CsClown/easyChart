/* loading google charts */
google.charts.load("current", { packages: ["corechart"] });
// google.charts.setOnLoadCallback(drawChart);

/* setting the title of the chart */

let titleBtn = document.getElementById("title-submit-btn");
let title = "your title here";

/* *click* */
titleBtn.addEventListener("click", function () {
  title = document.getElementById("title-input").value;
  document.getElementById("set-title").innerText = "Title is set: " + title;
});

/* *Enter* */
document
  .getElementById("title-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      title = document.getElementById("title-input").value;
      document.getElementById("set-title").innerText = "Title is set: " + title;
    }
  });

/* Adding and removing rows of the data set */
let plusBtn = document.getElementById("plus-row-btn");

plusBtn.addEventListener("click", function () {
  let newRow = document.createElement("li");
  newRow.classList.add("row");
  newRow.innerHTML = `
        <input type="text" name="name" class="name" />
        <input type="text" name="value" class="value" />
    `;
  document.getElementsByTagName("ol")[0].appendChild(newRow);
});

let minusBtn = document.getElementById("minus-row-btn");

minusBtn.addEventListener("click", function () {
  let rows = document.getElementsByClassName("row");
  if (rows.length > 1) {
    rows[rows.length - 1].remove();
  }
});

/* create the data array */

let dataSet = [];

let allRows = document.getElementsByClassName("row");

function createDataSet(rows) {
  for (let row = 0; row < rows.length; row++) {
    dataSet.push(fetchRow(row));
  }
}
function fetchRow(rowNumber) {
  let nameData = document.getElementsByClassName("name")[rowNumber].value;
  let valueData = parseInt(
    document.getElementsByClassName("value")[rowNumber].value
  );
  return [nameData, valueData];
}

let showData = document.getElementById("sd");
showData.addEventListener("click", function () {
  dataSet = [];
  createDataSet(allRows);
  // giveFeedback();
  drawChart();
});

/* dev-div "feedback" for outputting stuff */
function giveFeedback() {
  document.getElementById("feedback").innerText = "Data Set: " + dataSet;
  console.log(dataSet);
}

/* ChARTING */

/* setting the chart (code snippets from developers.google.com) */

function drawChart() {
  var data = new google.visualization.DataTable();

  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows(dataSet);

  var options = { title: title, width: 400, height: 300 };

  var chart = new google.visualization.PieChart(
    document.getElementById("chart-div")
  );
  chart.draw(data, options);
}
