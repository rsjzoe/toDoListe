import "./style.css";

const modal = document.querySelector(".modal");
const addButton = document.querySelector(".btn-add");
const btnClose = document.querySelector(".btn-close");
const tbody = document.querySelector("tbody");
const btnCreate = document.querySelector(".btn-create");
const btnUptdate = document.querySelector(".btn-update");
const nameInput = document.querySelector(".name-input");
const jobInput = document.querySelector(".job-input");

let dataTable = [
  { id: 1, name: "Koto", job: "manager" },
  { id: 2, name: "rasoa", job: "designer" },
];
let compteur = 3;

function showModal() {
  modal.style.display = "grid";
}
function closeModal() {
  modal.style.display = "none";
}
addButton.addEventListener("click", () => {
  showModal();
  btnUptdate.style.display = "none";
  btnCreate.style.display = "block";
});

btnClose.addEventListener("click", () => {
  closeModal();
});

/*---INSERT_DATA---*/
function insertData(name, job, id) {
  tbody.insertAdjacentHTML(
    "beforeend",
    `
        <tr class="${"tr-" + id} even:bg-blue-gray-50/50">
                  <td class="p-4">
                    <p
                      class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                    >
                      ${name}
                    </p>
                  </td>
                  <td class="p-4">
                    <p
                      class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                    >
                      ${job}
                    </p>
                  </td>
                  <td class="p-4">
                    <p
                      class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                    >
                      23/04/18
                    </p>
                  </td>
                  <td class="p-4 flex gap-7">
                    <a
                      href="#"
                      class="${
                        "e-" + id
                      } block font-sans text-sm bg-green-100 w-11 text-center rounded-sm text-green-700 antialiased font-medium leading-normal text-blue-gray-900"
                      >Edit</a
                    >
                    <a
                      href="#"
                      class="block font-sans text-sm antialiased w-16 text-center rounded-sm bg-red-100 font-medium leading-normal text-red-700"
                      id="${"rmv" + id}" >remove</a
                    >
                  </td>
        </tr>`
  );
  removeData(id);
  editeTable(id);
}
function renderData() {
  tbody.innerHTML = "";
  fetch("http://localhost:3000/person")
    .then((res) => res.json())
    .then((data) => {
      for (let indexData of data) {
        insertData(indexData.name, indexData.job, indexData.id);
      }
      dataTable = data;
      compteur = data.length + 1;
    });
}
renderData();

/*---ADD_DATA---*/
btnCreate.addEventListener("click", () => {
  modal.style.display = "none";
  fetch("http://localhost:3000/person", {
    method: "POST",
    body: JSON.stringify({
      id: compteur,
      name: nameInput.value,
      job: jobInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  insertData(nameInput.value, jobInput.value, compteur);
  dataTable.push({ name: nameInput.value, job: jobInput.value, id: compteur });
  compteur++;
  nameInput.value = "";
  jobInput.value = "";
});

/*--remove-----*/
function removeData(id) {
  document.querySelector("#" + "rmv" + id).addEventListener("click", () => {
    document.querySelector("." + "tr-" + id).remove();
    dataTable = deleteData(id);
    fetch(`http://localhost:3000/person/${id}`, {
      method: "DELETE",  
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
}

function deleteData(idVal) {
  let tab = [];
  for (let index of dataTable) {
    if (index.id !== idVal) {
      tab.push(index);
    }
  }
  return tab;
}

/*---edite----*/
let currentId = 0;
function editeTable(id) {
  document.querySelector("." + "e-" + id).addEventListener("click", () => {
    showModal();
    btnCreate.style.display = "none";
    btnUptdate.style.display = "block";
    for (let indexDataTab of dataTable) {
      if (indexDataTab.id == id) {
        nameInput.value = indexDataTab.name;
        jobInput.value = indexDataTab.job;
      }
    }
    currentId = id;
  });
}

btnUptdate.addEventListener("click", () => {
  fetch(`http://localhost:3000/person/${currentId}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: nameInput.value,
      job: jobInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let index of dataTable) {
        if (index.id == currentId) {
          index.name = nameInput.value;
          index.job = jobInput.value;
        }
      }
      nameInput.value = "";
      jobInput.value = "";
      closeModal();
      renderData();
    });
});
