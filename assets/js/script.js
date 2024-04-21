

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
                  <h2 id="set-title">"<strong>${title}</strong>"</h2>
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
  //remove row
  if (event.target.matches(".remove-row-btn")) {
    if (document.getElementsByClassName('remove-row-btn').length === 2) {
      removeSpecificRow(event);
      document.getElementsByClassName('remove-row-btn')[0].remove();
    } else {
      removeSpecificRow(event);
    }

  //add row
  } else if (event.target.matches('#plus-row-btn')){
    // checking if theres already a -row button next to first list item
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
let exampleSet = [
  ["Styling", 3],
  ["HTML", 1],
  ["Procrasti-mating", 0.5],
  ["Research", 3],
  ["JS", 2],
];

function setExample() {
  title = 'Time spend';
  dataSet = exampleSet;
  return (dataSet);
}

//switch the data setter div if example chart is clicked
let dataSetterContent = document.getElementById('data-setter').innerHTML;

document.getElementById('data-setter').addEventListener('click', function(event){
  if (event.target.id === 'reset-data-setter-btn') {
    document.getElementById('data-setter').innerHTML = dataSetterContent;
    dataSet= [];
    chartInstance.destroy();
    document.getElementById('canvas-div').style.display = 'none';

  }
})

function switchDataSetter() {
  let newContent = document.getElementById('data-setter');
  newContent.innerHTML = '<button id="reset-data-setter-btn" class="btn centered-btn">create own data set</button>';
}

/* choosing the chart type and executing draw*/
let drawChartBtn = document.getElementsByClassName("draw-chart-btn");
for (i = 0; i < drawChartBtn.length; i++) {
  drawChartBtn[i].addEventListener("click", function (event) {

    if (event.target.id === "pie-chart-btn") {
      if (dataSet === exampleSet) {
        drawJsChart('pie');
        return;
      }
      if (title === 'Time spend') {title = 'generic chart'}
      dataSet = [];
      createDataSet(allRows);
      drawJsChart('pie');

    } else if (event.target.id === "col-chart-btn") {
      if (dataSet === exampleSet) {
        drawJsChart('radar');
        return;
      }
      if (title === 'Time spend') {title = 'generic chart'}
      dataSet = [];
      createDataSet(allRows);
      drawJsChart('radar');

    } else if (event.target.id === "bar-chart-btn") {
      if (dataSet === exampleSet) {
        drawJsChart('bar');
        return;
      }
      if (title === 'Time spend') {title = 'generic chart'}
      dataSet = [];
      createDataSet(allRows);
      drawJsChart('bar');

      // Draw Example-Chart
    } else if (event.target.id === "example-chart-btn") {
      switchDataSetter();
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

/* setting the chart (customized code snippets from chartJS.org) */


let chartInstance = null;

function drawJsChart(chartType) {
  document.getElementById('canvas-div').style.display = 'block';
  let jsChart = document.getElementById('js-chart');

  // If theres an instance of a chart, destroy it
  if (chartInstance != null) {
    chartInstance.destroy();
  }

  // Display legend switch for pie chart
  let displayLegend = false;
  if (chartType === 'pie') {
    displayLegend = true;
  }

  //Building the chart
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
          display: displayLegend,
          labels: {
            color: 'white'
          }
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

//downloading the chart as Jpg
let downloadBtn = document.getElementById('save-chart-btn');
downloadBtn.addEventListener('click', downloadChart);

function downloadChart() {
  let canvas = document.getElementById('js-chart');
  let dataURL = canvas.toDataURL('image/jpg');

  let link = document.createElement('a');
  link.href = dataURL;

  //Replace empty spaces in the title with underscore
  let newTitle = title.replace(/\s/g, '_');
  link.download = `${newTitle}_easyChart.jpg`;
  link.click();
}