const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const title = document.querySelector('[data-testid="test-todo-title"]');
const status = document.querySelector('[data-testid="test-todo-status"]');
const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');

const dueDate = new Date("2026-03-01T18:00:00Z");

function updateTimeRemaining() {
  const now = new Date();
  const diff = dueDate - now;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (diff <= 0) {
    if (Math.abs(hours) < 1) {
      timeRemainingEl.textContent = "Due now!";
    } else {
      timeRemainingEl.textContent = `Overdue by ${Math.abs(hours)} hour(s)`;
    }
    return;
  }

  if (days >= 2) {
    timeRemainingEl.textContent = `Due in ${days} days`;
  } else if (days === 1) {
    timeRemainingEl.textContent = "Due tomorrow";
  } else if (hours >= 1) {
    timeRemainingEl.textContent = `Due in ${hours} hours`;
  } else {
    timeRemainingEl.textContent = `Due in ${minutes} minutes`;
  }
}

// run immediately
updateTimeRemaining();
// update every 60 seconds
setInterval(updateTimeRemaining, 60000);

// checkbox behavior
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    title.style.textDecoration = "line-through";
    status.textContent = "Done";
  } else {
    title.style.textDecoration = "none";
    status.textContent = "Pending";
  }
});