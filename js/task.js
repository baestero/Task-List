export default function initTask() {
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

    if (tarefa === "") {
      input.style.border = "2px solid red";
      alert("Preencha o título da Tarefa");
      console.log("vazio");
    } else {
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

      modal.classList.remove("ativo");
      body.style.display = "block";
      body.classList.add("body-container");
      input.style.border = "none";
      taskContainer.classList.add("ativo");

      salvarContainer(novoContainer.outerHTML);

      atualizarContador();
    }
  });

  btnDelete.addEventListener("click", (event) => {
    const containersSalvos =
      JSON.parse(localStorage.getItem("containersSalvos")) || [];

    const containerRemover = document.querySelectorAll(".add");
    containerRemover.forEach((item) => {
      item.classList.add("remove");
      setTimeout(() => {
        item.remove();

        const dataContadorToRemove = item.getAttribute("data-contador");
        const index = containersSalvos.findIndex((containerHtml) => {
          const novoContainer = document.createElement("div");
          novoContainer.innerHTML = containerHtml;
          return (
            novoContainer
              .querySelector("[data-contador]")
              .getAttribute("data-contador") === dataContadorToRemove
          );
        });
        if (index !== -1) {
          containersSalvos.splice(index, 1);
          localStorage.setItem(
            "containersSalvos",
            JSON.stringify(containersSalvos)
          );

          atualizarContador();
        }
      }, 500);
    });
  });

  function salvarContainer(containerHtml) {
    let containersSalvos =
      JSON.parse(localStorage.getItem("containersSalvos")) || [];

    containersSalvos.push(containerHtml);
    localStorage.setItem("containersSalvos", JSON.stringify(containersSalvos));
  }

  function restaurarContainers() {
    const containersSalvos =
      JSON.parse(localStorage.getItem("containersSalvos")) || [];

    containersSalvos.forEach((containerHtml) => {
      const novoContainer = document.createElement("div");
      novoContainer.innerHTML = containerHtml;

      const taskContainer = document.querySelector("[data-task-container]");
      taskContainer.parentNode.insertBefore(
        novoContainer,
        taskContainer.nextElementSibling
      );

      const filhoDoNovoContainer = novoContainer.querySelector("div");
      if (filhoDoNovoContainer) {
        if (filhoDoNovoContainer.classList.contains("add"))
          filhoDoNovoContainer.classList.remove("add");
      }
    });

    atualizarContador();
  }

  restaurarContainers();

  function handleClick(event) {
    const containerSelecionado = event.target.closest("[data-contador]");

    if (
      containerSelecionado &&
      containerSelecionado.classList.contains("task")
    ) {
      const todosContainer = document.querySelectorAll("[data-contador]");

      if (containerSelecionado.classList.contains("add")) {
        containerSelecionado.classList.remove("add");
      } else {
        todosContainer.forEach((item) => {
          item.classList.remove("add");
        });
        containerSelecionado.classList.add("add");
      }
    }
  }

  document.addEventListener("click", handleClick);

  function atualizarContador() {
    const contador = document.querySelector("span");
    contador.innerHTML = "(" + contaContainers() + ")";
  }

  function contaContainers() {
    const containers = document.querySelectorAll("[data-contador]");
    return containers.length;
  }
}
