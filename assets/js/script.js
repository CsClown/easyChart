/* loading google charts */
google.charts.load("current", { packages: ["corechart"] });
// google.charts.setOnLoadCallback(drawChart);

/* initializing the DataSet */
let dataSet = [];
/* setting the title of the chart */

/* setting EventListener on "button-parent" because on "button" it gets lost on DOM change */
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
    ).innerHTML = `<label for="title-input">title <i class="fa-solid fa-file-signature"></i></label>
      <input type="text" name="title" id="title-input" class="text-input" />
      <button id="title-submit-btn" class="btn"><i class="fa-solid fa-check"></i></button>`;

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
let dataSetter = document.getElementById("data-setter");

dataSetter.addEventListener("click", function (event) {
  if (event.target.matches(".remove-row-btn")) {
    if (document.getElementsByClassName('remove-row-btn').length === 2){
      removeSpecificRow(event);
      document.getElementsByClassName('remove-row-btn')[0].remove();
    } else {
      removeSpecificRow(event);
    }
  }
});

// Removes a specific row from the Data Set by navigation through the
// DOM via closest <li> item and fetching its index from its parent <ol>
function removeSpecificRow(event) {
  let orderedList = document.getElementById("row-list");
  let removeBtn = event.target;
  let removeListItem = removeBtn.closest("li");
  let listItems = Array.from(orderedList.children);
  index = listItems.indexOf(removeListItem);
  dataSet.splice(index, 1);
  removeListItem.remove();
}

/* row adder */
plusBtn.addEventListener("click", function () {
  // checking if theres already a button next to first list item
  // then appending it and creating a new row
  let checkBtn = document.querySelector(".remove-row-btn");
  if (!checkBtn) {
    let firstRowBtn = document.createElement("button");
    firstRowBtn.classList = "remove-row-btn btn";
    firstRowBtn.innerText = "- row";
    let firstRow = document.querySelector("ol li");
    if (firstRow) {
      firstRow.appendChild(firstRowBtn);
    }
  }

  let newRow = document.createElement("li");
  newRow.classList.add("row");
  newRow.innerHTML = `
        <input type="text" name="name" class="name text-input" />
        <input type="number" name="value" class="value text-input" />
        <button class='remove-row-btn btn'>- row</button>
    `;
  document.getElementsByTagName("ol")[0].appendChild(newRow);
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


// Set DataSet Example
function setExample() {
  title = 'Time spend';
  dataSet = [
    ["Styling", 3],
    ["HTML", 1],
    ["Procrasti-mating", 0.5],
    ["Research", 3],
    ["JS", 2],
  ];
  return(dataSet);
}

/* choosing the chart type */
let drawChartBtn = document.getElementsByClassName("draw-chart-btn");
for (i = 0; i < drawChartBtn.length; i++) {
  drawChartBtn[i].addEventListener("click", function (event) {
    if (event.target.id === "pie-chart-btn") {
      dataSet = [];
      createDataSet(allRows);
      //drawChart("pie");
      drawJsChart('pie');
    } else if (event.target.id === "col-chart-btn") {
      dataSet = [];
      createDataSet(allRows);
      //drawChart("col");
      drawJsChart('line');
    } else if (event.target.id === "bar-chart-btn") {
      dataSet = [];
      createDataSet(allRows);
      //drawChart("bar");
      drawJsChart('bar');

      // Draw Example-Chart
    } else if (event.target.id === "example-chart-btn") {
      dataSet = setExample();
      drawJsChart("pie");
    }
  });
}

/* dev-div "feedback" for outputting stuff */
function giveFeedback() {
  document.getElementById("feedback").innerText = "Data Set: " + dataSet;
  console.log(dataSet);
}

/* CHARTING */

/* setting the chart (customized code snippets from developers.google.com) */

function drawChart(chartType) {
  var data = new google.visualization.DataTable();

  data.addColumn("string", "Item");
  data.addColumn("number", "Amount");
  data.addRows(dataSet);

  var options = { title: title, width: 800, height: 400 };

  if (chartType === "pie") {
    var chart = new google.visualization.PieChart(
      document.getElementById("chart-div")
    );
  } else if (chartType === "col") {
    var chart = new google.visualization.ColumnChart(
      document.getElementById("chart-div")
    );
  } else if (chartType === "bar") {
    var chart = new google.visualization.BarChart(
      document.getElementById("chart-div")
    );
  }

  chart.draw(data, options);
  document.getElementById('chart-div').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  });
}




let chartInstance = null;
function drawJsChart(chartType) {
  let jsChart = document.getElementById('js-chart');

  // If theres an instance of a chart, destroy it
  if (chartInstance != null) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(jsChart, {
    type: chartType,
    data: {
      labels: dataSet.map(innerArray => innerArray[0]),
      datasets: [{
        data: dataSet.map(innerArray => innerArray[1]),
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true, 
          text: title,
          color: 'white',
          font: {
            size: 20
          }
        }
        
      
      }
      
      
      
    }
  });

  // scroll into view
  document.getElementById('js-chart').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  });

}

