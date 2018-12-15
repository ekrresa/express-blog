let ul = document.querySelector("ul.archives");
let ul2 = document.querySelector("ul.categories");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const url = "/aside/categories";
const url2 = "/aside/posts/group";

const promises = [
  fetch(url)
    .then(data => data.json())
    .catch(err => console.log(err)),
  fetch(url2)
    .then(data => data.json())
    .catch(err => console.log(err))
];

Promise.all(promises)
  .then(data => {
    data[0].map(row => {
      let li = createNode("li"),
        a = createNode("a");
      span = createNode("span");
      a.classList.add("btn");
      a.href = `/blog/posts/${row.name}`;
      span.innerHTML = `${row.name}`;
      append(a, span);
      append(li, a);
      append(ul2, li);
    });
    data[1].map(row => {
      let li = createNode("li"),
        a = createNode("a");
      span = createNode("span");
      a.classList.add("btn");
      a.href = `/blog/posts/date/${row._id.year}/${row._id.month}`;
      span.innerHTML = `${row._id.month} ${row._id.year} (${row.count})`;
      append(a, span);
      append(li, a);
      append(ul, li);
    });
  })
  .catch(err => console.log(err));
