// Define students and tasks
const Students = ["John", "Kate", "Liam", "Mia", "Noah"];
const Tasks = ["Cleaning", "Cooking", "Gardening", "Coding", "Security"];

// Initialize a map to store the tasks for each student
let studentTasks = {
  John: [],
  Kate: [],
  Liam: [],
  Mia: [],
  Noah: []
};

// Function to render the drag-and-drop puzzle
function renderPuzzle() {
  const container = document.getElementById("puzzle-container");
  container.innerHTML = ""; // Clear previous content

  // Create task list
  const taskList = document.createElement("div");
  taskList.className = "task-list";
  taskList.innerHTML = "<h3>Tasks</h3>";
  Tasks.forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.className = "task";
    taskItem.textContent = task;
    taskItem.draggable = true;
    taskItem.ondragstart = event => onDragStart(event, task);
    taskList.appendChild(taskItem);
  });
  container.appendChild(taskList);

  // Create student drop zones
  const studentContainer = document.createElement("div");
  studentContainer.className = "student-container";
  Students.forEach(student => {
    const studentDiv = document.createElement("div");
    studentDiv.className = "student";
    studentDiv.innerHTML = `<h3>${student}</h3><div class="drop-zone" 
        data-student="${student}" ondrop="onDrop(event)" ondragover="onDragOver(event)">
        Drop tasks here</div>`;
    studentContainer.appendChild(studentDiv);
  });
  container.appendChild(studentContainer);

// Add buttons
const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";

// Add Clue Button first
const clueButton = document.createElement("button");
clueButton.textContent = "Show Clues";
clueButton.onclick = showCluePopup;
buttonContainer.appendChild(clueButton);

// Check Solution Button
const checkButton = document.createElement("button");
checkButton.textContent = "Check Solution";
checkButton.onclick = checkSolution;
buttonContainer.appendChild(checkButton);

// Retry Button
const retryButton = document.createElement("button");
retryButton.textContent = "Retry";
retryButton.onclick = resetPuzzle;
buttonContainer.appendChild(retryButton);

container.appendChild(buttonContainer);
}

// Drag-and-drop event handlers
function onDragStart(event, task) {
  event.dataTransfer.setData("text/plain", task);
}

function onDragOver(event) {
  event.preventDefault();
}

//Ondrop
function onDrop(event) {
  event.preventDefault();
  const task = event.dataTransfer.getData("text/plain");
  const student = event.target.getAttribute("data-student");

  if (student && task) {
    studentTasks[student].push(task);

    // Display the dropped task in the drop zone
    const droppedTask = document.createElement("div");
    droppedTask.textContent = task;
    droppedTask.className = "dropped-task";
    event.target.appendChild(droppedTask);
  }
}

// Check the solution
function checkSolution() {
  const solution = solvePuzzle();

  // Compare user input to the solution
  let correct = true;
  for (const student in solution) {
    if (
      !(
        solution[student].length === studentTasks[student].length &&
        solution[student].every(task => studentTasks[student].includes(task))
      )
    ) {
      correct = false;
      break;
    }
  }

  // Display result in the popup
  const popupMessage = document.getElementById("popup-message");
  popupMessage.textContent = correct
    ? "🎉 Correct! You've solved the puzzle!"
    : "❌ Incorrect! Hit the Retry button now!!";

  const popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "block";
}

// Function to close the popup
function closePopup() {
  const popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "none";
}

// Solve the puzzle based on the clues
function solvePuzzle() {
  return {
    John: ["Coding", "Gardening"],
    Kate: ["Security", "Cleaning"],
    Liam: ["Gardening", "Cleaning"],
    Mia: ["Cooking", "Cleaning"],
    Noah: ["Coding", "Security"]
  };
}

// Reset the puzzle
function resetPuzzle() {
  studentTasks = {
    John: [],
    Kate: [],
    Liam: [],
    Mia: [],
    Noah: []
  };

  // Clear the result and re-render the puzzle
  const resultContainer = document.getElementById("result-container");
  resultContainer.textContent = "";
  renderPuzzle();
}

// Initialize the drag-and-drop interface
document.addEventListener("DOMContentLoaded", () => {
  renderPuzzle();
});

// Function to show the clue popup
function showCluePopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("clue-popup").style.display = "block";
}

// Function to close the clue popup
function closeCluePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("clue-popup").style.display = "none";
}

// Initialize the drag-and-drop interface and clue button
document.addEventListener("DOMContentLoaded", () => {
  renderPuzzle();
  addClueButton();
});