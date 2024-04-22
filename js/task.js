export default function initiTask() {
  const tarefas = document.querySelector("[data-input]");
  const descricoes = document.querySelector("[data-descricao]");
  const create = document.querySelector("[data-create]");
  const modal = document.querySelector("[data-modal]");
  const taskContainer = document.querySelector("[data-task-container]");
  const body = document.querySelector("[data-body]");
  const input = document.querySelector("input");
  const btnDelete = document.querySelector("[data-delete]");

  create.addEventListener("click", () => {
    const tarefa = tarefas.value;
    const descricao = descricoes.value;
    const novaTarefa = document.createElement("ul");
    const novaDescricao = document.createElement("li");

    const novoContainer = document.createElement("div");
    novoContainer.setAttribute("data-contador", "");
    novoContainer.classList.add("task", "ativo");

    const novaUl = document.createElement("ul");
    novaUl.setAttribute("data-tarefas-lista", "");

    novoContainer.appendChild(novaUl);
    taskContainer.parentNode.insertBefore(
      novoContainer,
      taskContainer.nextElementSibling
    );

    novaTarefa.innerHTML = `${tarefa}`;
    novaUl.appendChild(novaTarefa);

    novaDescricao.innerHTML = `${descricao}`;
    novaUl.appendChild(novaDescricao);

    novoContainer.addEventListener("click", handleClick);

    modal.classList.remove("ativo");
    body.style.display = "block";
    body.classList.add("body-container");
    input.style.border = "none";
    taskContainer.classList.add("ativo");

    btnDelete.addEventListener("click", (event) => {
      const containerRemover = document.querySelectorAll(".add");
      containerRemover.forEach((item) => {
        item.classList.add("remove");
        setTimeout(() => {
          item.remove();
        }, 500);
      });

      contador.innerHTML = "(" + (contaContainers() - 1) + ")";
    });

    contador.innerHTML = "(" + contaContainers() + ")";
  });

  function handleClick(event) {
    const todosContainer = document.querySelectorAll("[data-contador]");
    todosContainer.forEach((item) => {
      item.classList.remove("add");
    });
    event.currentTarget.classList.add("add");
  }

  const contador = document.querySelector("span");
  function contaContainers() {
    const containers = document.querySelectorAll("[data-contador]");
    return containers.length;
  }
}
