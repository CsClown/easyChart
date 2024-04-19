/* loading google charts */
google.charts.load("current", { packages: ["corechart"] });
// google.charts.setOnLoadCallback(drawChart);

/* initializing the DataSet */
let dataSet = [];
/* setting the title of the chart */

/* setting EventListener on button-parent because on button it gets lost on DOM change */
let titleSetter = document.getElementById("title-setter");
titleSetter.addEventListener("click", function (event) {
  if (event.target.matches("#title-submit-btn")) {
    titleSwitch();
  }
});

let title = "generic chart";

function titleSwitch() {
  title = document.getElementById("title-input").value;
  document.getElementById("title-setter").innerHTML = `
                  <span>Chart title:  </span>
                  <h4 id="set-title">"${title}"</h4>
                  `;
  let renameBtn = document.createElement("button");
  renameBtn.textContent = "rename";
  renameBtn.classList = "btn";
  renameBtn.id = "rename-btn";
  document.getElementById("title-setter").appendChild(renameBtn);

  /* reverse changes if "rename" is clicked */
  renameBtn.addEventListener("click", function () {
    document.getElementById(
      "title-setter"
    ).innerHTML = `<label for="title-input">name your chart </label>
      <input type="text" name="title" id="title-input" class="text-input" />
      <button id="title-submit-btn" class="btn">submit</button>`;

    /* setting the EventListener for the "Enter" input repeatedly because it gets lost on DOM change */
    document
      .getElementById("title-input")
      .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          titleSwitch();
        }
      });
  });
}

/* *click* */

/* *Enter* */
document
  .getElementById("title-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      titleSwitch();
    }
  });

/* Adding and removing rows of the data set */

let plusBtn = document.getElementById("plus-row-btn");
let dataSetter = document.getElementById('data-setter');

dataSetter.addEventListener('click', function(event){
  if (event.target.matches('.remove-row-btn')) {
    removeSpecificRow(event);
  }
});

// Removes a specific row from the Data Set by navigation through the
// DOM via closest <li> item and fetching its index from its parent <ol>
function removeSpecificRow(event) {
  let orderedList = document.getElementById('row-list');
  let removeBtn = event.target;
  let removeListItem = removeBtn.closest('li');
  let listItems = Array.from(orderedList.children);
  index = listItems.indexOf(removeListItem);
  dataSet.splice(index, 1);
  removeListItem.remove();

}

plusBtn.addEventListener("click", function () {
  let newRow = document.createElement("li");
  newRow.classList.add("row");
  newRow.innerHTML = `
        <input type="text" name="name" class="name text-input" />
        <input type="number" name="value" class="value text-input" />
        <button class='remove-row-btn btn'>-row</button>
    `;
  document.getElementsByTagName("ol")[0].appendChild(newRow);
});

function removeRow() {

}

let minusBtn = document.getElementById("minus-row-btn");

minusBtn.addEventListener("click", function () {
  let rows = document.getElementsByClassName("row");
  if (rows.length > 1) {
    rows[rows.length - 1].remove();
  }
});

/* create the data array */


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

/* setting the chart (customized code snippets from developers.google.com) */

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
