let ul = document.querySelector("ul.archives");
let ul2 = document.querySelector("ul.categories");
let ul3 = document.querySelector(".popular");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const url = "/aside/categories";
const url2 = "/aside/posts/group";
const url3 = "/aside/posts/views";

const promises = [
  fetch(url)
    .then(data => data.json())
    .catch(err => console.log(err)),
  fetch(url2)
    .then(data => data.json())
    .catch(err => console.log(err)),
  fetch(url3)
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
      a.href = `#`;
      span.innerHTML = `${row._id.month} ${row._id.year} (${row.count})`;
      append(a, span);
      append(li, a);
      append(ul, li);
    });
    data[2].map(row => {
      let div = createNode("div"),
        a = createNode("a"),
        img = createNode("img"),
        h6 = createNode("h6");
      img.src = `${row.image}`;
      a.href = `/blog/${row.category}/${row.url}`;
      h6.innerHTML = `${row.title}`;
      append(a, h6);
      append(div, a);
      append(div, img);
      append(ul3, div);
    });
  })
  .catch(err => console.log(err));
