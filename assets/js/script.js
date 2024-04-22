/* initializing the DataSet */
let dataSet = [];
/* setting the title of the chart */
let title = "generic chart";

//focus on title input
window.onload = function () {
  document.getElementById("title-input").focus();
};

/* setting EventListener on "button-parent" because on "button" it gets lost on DOM change */
let titleSetter = document.getElementById("title-setter");

/* *click* */
titleSetter.addEventListener("click", function (event) {
  if (event.target.matches("#title-submit-btn")) {
    let titleInput = document.getElementById("title-input");
    if (titleInput && titleInput.value.trim() !== "") {
      titleSwitch();
    } else {
    }
  }
});

/* *Enter* */
titleSetter.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let titleInput = document.getElementById("title-input");

    if (titleInput && titleInput.value.trim() !== "") {
      titleSwitch();
    }
  }
});

/* setting the title */
function titleSwitch() {
  title = document.getElementById("title-input").value;
  titleDiv = document.getElementById("title-setter");
  titleDiv.innerHTML = `
                  <label for="set-title">title <i class="fa-solid fa-file-signature"></i></label>
                  <h2 id="set-title">"<strong>${title}</strong>"</h2>
                  `;
  //adding "rename"-button
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
    titleSetter.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let titleInput = document.getElementById("title-input");

        if (titleInput && titleInput.value.trim() !== "") {
          titleSwitch();
        }
      }
    });
  });
}

/* Adding and removing rows of the data set */

let plusBtn = document.getElementById("plus-row-btn");
let dataSetter = document.getElementById("data-setter");

dataSetter.addEventListener("click", function (event) {
  //remove row
  if (event.target.matches(".remove-row-btn")) {
    if (document.getElementsByClassName("remove-row-btn").length === 2) {
      removeSpecificRow(event);
      document.getElementsByClassName("remove-row-btn")[0].remove();
    } else {
      removeSpecificRow(event);
    }

    //add row
  } else if (event.target.matches("#plus-row-btn")) {
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

dataSetter.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
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

/* create the data set array (ofArrays) */
let allRows = document.getElementsByClassName("row");

function fetchRow(rowNumber) {
  let nameData = document.getElementsByClassName("name")[rowNumber].value;
  let valueData = document.getElementsByClassName("value")[rowNumber].value;
  return [nameData, valueData];
}

function createDataSet(rows) {
  for (let row = 0; row < rows.length; row++) {
    dataSet.push(fetchRow(row));
  }
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
  title = "Time spent";
  dataSet = exampleSet;
  return dataSet;
}

//switch the data setter div if example chart is clicked
let dataSetterContent = document.getElementById("data-setter").innerHTML;

function switchDataSetter() {
  let newContent = document.getElementById("data-setter");
  newContent.innerHTML =
    '<button id="reset-data-setter-btn" class="btn centered-btn">create own data set</button>';
}


//reverse DOM-  changes on data setter div if "create own data set" is clicked
document
  .getElementById("data-setter")
  .addEventListener("click", function (event) {
    if (event.target.id === "reset-data-setter-btn") {
      resetActive();
      document.getElementById("title-setter").style.display = "flex";
      document.getElementById("data-setter").innerHTML = dataSetterContent;
      dataSet = [];
      chartInstance.destroy();
      document.getElementById("canvas-div").style.display = "none";
      document.getElementById("rename-btn").click();
      document.getElementById("title-input").focus();
    }
  });

/* choosing the chart type and invoking draw function*/
let drawChartBtn = document.getElementsByClassName("draw-chart-btn");
for (i = 0; i < drawChartBtn.length; i++) {
  drawChartBtn[i].addEventListener("click", function (event) {
    if (event.target.id === "pie-chart-btn") {
      if (dataSet === exampleSet) {
        drawJsChart("pie");
        return;
      }
      //if the title is still set by example data -> reset title to default
      if (title === "Time spent") {
        title = "generic chart";
      }
      dataSet = [];
      createDataSet(allRows);
      drawJsChart("pie");
    } else if (event.target.id === "col-chart-btn") {
      if (dataSet === exampleSet) {
        drawJsChart("radar");
        return;
      }
      if (title === "Time spent") {
        title = "generic chart";
      }
      dataSet = [];
      createDataSet(allRows);
      drawJsChart("radar");
    } else if (event.target.id === "bar-chart-btn") {
      if (dataSet === exampleSet) {
        drawJsChart("bar");
        return;
      }
      if (title === "Time spent") {
        title = "generic chart";
      }
      dataSet = [];
      createDataSet(allRows);
      drawJsChart("bar");

      // Draw Example-Chart
    } else if (event.target.id === "example-chart-btn") {
      if (dataSet === exampleSet) {
        return;
      }
      switchDataSetter();
      document.getElementById("title-setter").style.display = "none";
      dataSet = setExample();
      drawJsChart("pie");
    }
  });
}

/* CHARTING */

function dataMissing() {
  for (let i = 0; i < dataSet.length; i++) {
    for (let j = 0; j < dataSet[i].length; j++) {
      if (dataSet[i][j] === '') {
        return true;
      }
    }
  }
  return false;
}

/* setting the chart */

let chartInstance = null;

function drawJsChart(chartType) {
  //remove potential warning
  let warning = document.querySelector('.data-alert');
  if (warning) {
    warning.parentNode.removeChild(warning);
  }
  //check if any fields are empty
  if (dataMissing()) {
    let chartBtnRow = document.getElementById('chart-buttons');
    let warning = document.createElement('p');
    warning.classList.add('data-alert', 'alert');
    warning.innerText=('data is missing..');
    chartBtnRow.appendChild(warning);
    return;
  }
  //first indicate active chart on corresponding button
    //reset button color
    resetActive();

    //set active
  if (chartType === "pie") {
    document.getElementById("pie-chart-btn").classList.add("active");
  } else if (chartType === "radar") {
    document.getElementById("col-chart-btn").classList.add("active");
  } else if (chartType === "bar") {
    document.getElementById("bar-chart-btn").classList.add("active");
  }

  document.getElementById("canvas-div").style.display = "flex";
  let jsChart = document.getElementById("js-chart");

  // If theres an instance of a chart, destroy it
  if (chartInstance != null) {
    chartInstance.destroy();
  }

  // I want the Legend to show only on the pie chart
  let displayLegend = false;
  if (chartType === "pie") {
    displayLegend = true;
  }

  //Building the chart
  chartInstance = new Chart(jsChart, {
    type: chartType,
    data: {
      labels: dataSet.map((innerArray) => innerArray[0]),
      datasets: [
        {
          data: dataSet.map((innerArray) => innerArray[1]),
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: displayLegend,
          labels: {
            color: "white",
          },
        },
        title: {
          display: true,
          text: title,
          color: "white",
          font: {
            size: 20,
          },
        },
      },
    },
  });

  // scroll into view
  document.getElementById("js-chart").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

//reset active chart type indicator
function resetActive() {
  let buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
}

//downloading the chart as Jpg
let downloadBtn = document.getElementById("save-chart-btn");
downloadBtn.addEventListener("click", downloadChart);

function downloadChart() {
  let canvas = document.getElementById("js-chart");
  let dataURL = canvas.toDataURL("image/jpeg");

  let link = document.createElement("a");
  link.href = dataURL;

  //Replace empty spaces in the title with underscore
  let newTitle = title.replace(/\s/g, "_");
  link.download = `${newTitle}_easyChart.jpg`;
  link.click();
}
