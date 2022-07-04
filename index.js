const todoList = document.body.querySelector("#todo-list");
const form = document.body.querySelector("#form");

const get = () => {
  fetch("http://localhost:3000/todos")
    .then(function (resp) {
      console.log("my response", resp);
      return resp.json();
    })

    .then(function (data) {
      console.log("data", data);
      // do something with the people data here

      todoList.innerHTML = "";

      data.forEach((element) => {
        let liEle = document.createElement("li");
        liEle.innerText = element.title;

        if (element.completed) {
          liEle.className = "completed";
        }

        todoList.append(liEle);
      });
    });
};

const post = (value) => {
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      title: value,
      completed: false,
    }),
  })
  .then(function() {
    get()
  });
};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // const value = event.value

  const todoItem = event.target[0].value;

  console.log("todo item ", todoItem);

  event.target.reset()  

  post(todoItem);
});

get();
