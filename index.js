let myCourses = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const coursesFromLocalStorage = JSON.parse(localStorage.getItem("myCourses"));
const tabBtn = document.getElementById("tab-btn");

if (coursesFromLocalStorage) {
  myCourses = coursesFromLocalStorage;
  render(myCourses);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myCourses.push(tabs[0].url);
    localStorage.setItem("myCourses", JSON.stringify(myCourses));
    render(myCourses);
  });
});

function render(courses) {
  let listItems = "";
  for (let i = 0; i < courses.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${courses[i]}'>
                    ${courses[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myCourses = [];
  render(myCourses);
});

inputBtn.addEventListener("click", function () {
  myCourses.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myCourses", JSON.stringify(myCourses));
  render(myCourses);
});
