let ul = document.querySelector("ul.archives");
let item = document.createElement("li");
function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
const url = "/blog/posts/group";

fetch(url)
  .then(data => data.json())
  .then(result => {
    return result.map(row => {
      let li = createNode("li"),
        a = createNode("a");
      span = createNode("span");
      a.classList.add("btn");
      a.href = "#";
      span.innerHTML = `${row._id.month} ${row._id.year} (${row.count})`;
      append(a, span);
      append(li, a);
      append(ul, li);
    });
  })
  .catch(err => console.log(err));
