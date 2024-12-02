// Variables to track daily data
let dailyData = {
    dates: [], // Dates
    sleepHours: [], // Sleep hours
    studyHours: [], // Study hours
    mobileHours: [] // Mobile usage
  };
  
  // Function to add data for the day
  function addDailyData() {
    const date = new Date().toLocaleDateString();
    const sleep = document.getElementById("sleepHours").value || 0;
    const study = document.getElementById("studyHours").value || 0;
    const mobile = document.getElementById("mobileUsage").value || 0;
  
    dailyData.dates.push(date);
    dailyData.sleepHours.push(Number(sleep));
    dailyData.studyHours.push(Number(study));
    dailyData.mobileHours.push(Number(mobile));
  
    updateChart(); // Update the chart with new data
  }
  
  // Attach "Add Data" functionality to save data (daily data button)
  const saveDailyButton = document.createElement("button");
  saveDailyButton.innerText = "Save Today's Data";
  saveDailyButton.addEventListener("click", addDailyData);
  document.body.appendChild(saveDailyButton);
  
  // Initialize the Chart.js Line Chart
  const ctx = document.getElementById("habitChart").getContext("2d");
  const habitChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dailyData.dates, // Dynamic labels (dates)
      datasets: [
        {
          label: "Sleep Hours",
          data: dailyData.sleepHours,
          borderColor: "blue",
          fill: false,
          tension: 0.1
        },
        {
          label: "Study Hours",
          data: dailyData.studyHours,
          borderColor: "green",
          fill: false,
          tension: 0.1
        },
        {
          label: "Mobile Usage",
          data: dailyData.mobileHours,
          borderColor: "red",
          fill: false,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date"
          }
        },
        y: {
          title: {
            display: true,
            text: "Hours"
          },
          beginAtZero: true
        }
      }
    }
  });
  
  // Function to update chart when data changes
  function updateChart() {
    habitChart.data.labels = dailyData.dates;
    habitChart.data.datasets[0].data = dailyData.sleepHours;
    habitChart.data.datasets[1].data = dailyData.studyHours;
    habitChart.data.datasets[2].data = dailyData.mobileHours;
    habitChart.update();
  }
  
  // Sleep Tracking
document.getElementById("sleepHours").addEventListener("input", function () {
    const sleepHours = this.value;
    document.getElementById("sleepResult").innerText = `${((sleepHours / 6) * 100).toFixed(1)}%`;
  });
  
  // Study Tracking
  document.getElementById("studyHours").addEventListener("input", function () {
    const studyHours = this.value;
    document.getElementById("studyResult").innerText = `${((studyHours / 6) * 100).toFixed(1)}%`;
  });
  
  // Mobile Usage Tracking
  document.getElementById("mobileUsage").addEventListener("input", function () {
    const mobileHours = this.value;
    document.getElementById("mobileResult").innerText = `${((mobileHours / 3) * 100).toFixed(1)}%`;
  });
  
  // Exercise Tracking
  document.getElementById("exerciseButton").addEventListener("click", function () {
    const exerciseStatus = document.getElementById("exerciseStatus");
    if (exerciseStatus.style.color === "green") {
      exerciseStatus.style.color = "red";
      exerciseStatus.innerText = "✘";
      this.innerText = "No";
    } else {
      exerciseStatus.style.color = "green";
      exerciseStatus.innerText = "✔";
      this.innerText = "Yes";
    }
  });
  
  // Save Journal
  document.getElementById("saveJournal").addEventListener("click", function () {
    const journalText = document.getElementById("journal").value;
    alert(`Journal Saved: ${journalText}`);
  });
 // Save dailyData to localStorage
function saveDataToLocalStorage() {
    localStorage.setItem("dailyData", JSON.stringify(dailyData));
  }
  
  // Add daily data and save to localStorage
  function addDailyData() {
    const date = new Date().toLocaleDateString();
    const sleep = document.getElementById("sleepHours").value || 0;
    const study = document.getElementById("studyHours").value || 0;
    const mobile = document.getElementById("mobileUsage").value || 0;
  
    // Add new data
    dailyData.dates.push(date);
    dailyData.sleepHours.push(Number(sleep));
    dailyData.studyHours.push(Number(study));
    dailyData.mobileHours.push(Number(mobile));
  
    saveDataToLocalStorage(); // Save updated data to localStorage
    updateChart(); // Update the chart with new data
  }
// Load dailyData from localStorage
function loadDataFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem("dailyData"));
    if (storedData) {
      dailyData = storedData; // Restore data
      updateChart(); // Update the chart with loaded data
    }
  }
  
  // Call this function when the app starts
  loadDataFromLocalStorage();
// Save data automatically before the page unloads
window.addEventListener("beforeunload", saveDataToLocalStorage);
   