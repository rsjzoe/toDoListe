import "./style.css";

const modal = document.querySelector(".modal");
const addButton = document.querySelector(".btn-add");
const btnClose = document.querySelector(".btn-close");
const tbody = document.querySelector("tbody");
const btnCreate = document.querySelector(".btn-create");
const nameInput = document.querySelector(".name-input");
const jobInput = document.querySelector(".job-input");
const removeData = document.querySelector(`${removeAction}`);
const dataTable = [
  { name: "Koto", job: "manager" },
  { name: "rasoa", job: "dev" },
];

addButton.addEventListener("click", () => {
  modal.style.display = "grid";
});
btnClose.addEventListener("click", () => {
  modal.style.display = "none";
});

function insertData(name, job) {
  tbody.insertAdjacentHTML(
    "beforeend",
    `
        <tr class="even:bg-blue-gray-50/50">
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
                      class="block font-sans text-sm bg-green-100 w-11 text-center rounded-sm text-green-700 antialiased font-medium leading-normal text-blue-gray-900"
                      >Edit</a
                    >
                    <a
                      href="#"
                      class="${removeAction} block font-sans text-sm antialiased w-16 text-center rounded-sm bg-red-100 font-medium leading-normal text-red-700"
                      >remove</a
                    >
                  </td>
        </tr>`
  );
}

for (let indexData of dataTable) {
  insertData(indexData.name, indexData.job);
}
btnCreate.addEventListener("click", () => {
  modal.style.display = "none";
  insertData(nameInput.value, jobInput.value);
  dataTable.push({ name: nameInput.value, job: jobInput.value });
  console.log(dataTable);
  nameInput.value = "";
  jobInput.value = "";
});
console.log(removeData);



// function remove(removeAction){
//   document.getElementsByClassName(`${removeAction}`).remove()
// }

// removeData.addEventListener('click', ()=>{
//   removeDataTable(dataTable)
// })
