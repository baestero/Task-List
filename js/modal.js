export default function initiModal() {
  const newTask = document.querySelector("[data-newTask]");
  const modal = document.querySelector("[data-modal]");
  const closeBtn = document.querySelector("[data-close]");
  const body = document.querySelector("[data-body]");

  newTask.addEventListener("click", () => {
    modal.classList.add("ativo");
    body.style.display = "none";
    tarefa.classList.remove("ativo");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("ativo");
    tarefa.classList.remove("ativo");
    body.style.display = "block";
    body.classList.add("body-container");
  });

  const addTarefa = document.querySelector("[data-add-tarefa");
  const tarefa = document.querySelector('[data-add-tarefa="create"] ');

  addTarefa.addEventListener("click", () => {
    tarefa.classList.add("ativo");
  });
}
