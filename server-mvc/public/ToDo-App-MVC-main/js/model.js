class Model {
  constructor() {
    // database todo
    this.database = [];

    // id todo
    this.countId = 0;
    this.getData = JSON.parse(window.localStorage.getItem("Todo"));
    if (this.database.length === 0 && this.getData !== null) {
      this.getData.forEach((item) => {
        item.id > this.countId ? (this.countId = item.id) : (item.id = item.id);
        this.database.push(item);
      });
    }
  }

  // render Todo to view

  renderTodo(render) {
    this.render = render;
  }

  // add todo to database

  addTodo(todo) {
    this.database.push({
      id: ++this.countId,
      text: todo,
      completed: false,
      edit: false,
    });
    this.render(this.database);
    localStorage.setItem("Todo", JSON.stringify(this.database));
  }

  // toggle Todo to database

  toggleTodo(id) {
    this.database = this.database.map((todo) => (todo.id === id ? { id: todo.id, text: todo.text, completed: !todo.completed } : todo));
    this.render(this.database);
    localStorage.setItem("Todo", JSON.stringify(this.database));
  }

  // edit todo to database
  editTodo(idTodo, editTodo) {
    for (let editText of this.database) {
      if (idTodo === editText.id) {
        editText.edit = !editText.edit;
        editText.text = editTodo;
      }
    }
    this.render(this.database);
    localStorage.setItem("Todo", JSON.stringify(this.database));
  }

  // delete todo to database

  deleteTodo(id) {
    this.database = this.database.filter((todo) => {
      return todo.id !== id;
    });
    this.render(this.database);
    localStorage.setItem("Todo", JSON.stringify(this.database));
  }

  // search todo to database

  searchTodo(term) {
    const searchTodo = this.database.filter((todo) => {
      return todo.text.toLowerCase().includes(term.toLowerCase());
    });
    this.render(searchTodo);
  }

  //upload todo to server

  uploadTodo() {
    fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.database),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //download todo from server

  async downloadTodo() {
    const url = "/download";
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    console.log(data);
    this.database = data;
    this.render(this.database);
    localStorage.setItem("todo", JSON.stringify(this.database));
  }

  // filter todo  to database
  filterTodo(statusTodo) {
    if (statusTodo === "all") {
      this.render(this.database);
    } else if (statusTodo === "complete") {
      let filterDataBase = this.database.filter((filter) => {
        return filter.completed !== false;
      });
      this.render(filterDataBase);
    } else if (statusTodo === "active") {
      let filterDataBase = this.database.filter((filter) => {
        return filter.completed !== true;
      });
      this.render(filterDataBase);
      localStorage.getItem("Todo", JSON.stringify(this.database));
    }
  }
}
export default Model;
