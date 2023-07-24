// select Input from doc

let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let btnAdd = document.getElementById("submit");
let btnUpdate = document.getElementById("Update");
let searchInput = document.getElementById("searchInput");
var emailHelp = document.getElementById("emailHelp");
var SiteHelp = document.getElementById("SiteHelp");

var bookMarkArr = [];

var indexUpdate = 0;

if (localStorage.getItem("bookmark") != null) {
  bookMarkArr = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark();
}

// console.log(siteName, siteUrl);

function addBookMark() {
  if (validSiteName() && validSiteURL()) {
    var bookmarkObj = {
      name: siteName.value,
      url: siteUrl.value,
    };
    bookMarkArr.push(bookmarkObj);
    // save Data in localStorage
    localStorage.setItem("bookmark", JSON.stringify(bookMarkArr));
    // confirmMsg();
    displayBookmark();
    showAlert("Success Add Content", "success");
    clearInput();
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
    emailHelp.classList.add("d-none");
  }
}

function displayBookmark() {
  var container = "";
  for (let i = 0; i < bookMarkArr.length; i++) {
    container += `
    <tr>
              <td class="align-middle">${i}</td>
              <td class="align-middle">${bookMarkArr[i].name}</td>
              <td class="align-middle">
                <a class="btn w-50 btn-success" href="${bookMarkArr[i].url}" target="_blank">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  View
                </a>
              </td>
              <td>
              <div>
              <button class="btn btn-danger w-50 mb-3" onclick ="deleteBook(${i})">
              <i class="fa fa-trash" aria-hidden="true"></i> Delete
            </button>
              </div>
              <div>
              <button class="btn btn-warning w-50" onclick ="editBook(${i})">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
            </button>
            </div>
              </td>
            </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = container;
}

function clearInput() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteBook(index) {
  // console.log("Delete Item");
  bookMarkArr.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookMarkArr));
  displayBookmark();
  showAlert("Delete Item Done!", "danger");
}

function editBook(index) {
  // console.log(index);
  indexUpdate = index;
  var EditBook = bookMarkArr[index];
  siteName.value = EditBook.name;
  siteUrl.value = EditBook.url;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateBook() {
  // console.log(indexUpdate);
  var bookmarkObj = {
    name: siteName.value,
    url: siteUrl.value,
  };
  bookMarkArr.splice(indexUpdate, 1, bookmarkObj);
  localStorage.setItem("bookmark", JSON.stringify(bookMarkArr));
  displayBookmark();
  clearInput();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  showAlert("Item Update Done!", "warning");
}

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `w-25 text-center alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  div.classList.add("alertPos");
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function searchData() {
  let searchKey = searchInput.value;
  var container = "";
  for (let i = 0; i < bookMarkArr.length; i++) {
    if (bookMarkArr[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
      container += `
      <tr>
      <td class="align-middle">${i}</td>
      <td class="align-middle">${bookMarkArr[i].name}</td>
      <td class="align-middle">
        <a class="btn w-50 btn-success" href="${bookMarkArr[i].url}" target="_blank">
          <i class="fa fa-eye" aria-hidden="true"></i>
          View
        </a>
      </td>
      <td>
      <div>
      <button class="btn btn-danger w-50 mb-3" onclick ="deleteBook(${i})">
      <i class="fa fa-trash" aria-hidden="true"></i> Delete
    </button>
      </div>
      <div>
      <button class="btn btn-warning w-50" onclick ="editBook(${i})">
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
    </button>
    </div>
      </td>
    </tr>
`;
    }
  }

  document.getElementById("tableContent").innerHTML = container;
}

function validSiteName() {
  var regex = /^[a-zA-Z]+$/g;
  var SiteName = siteName.value;
  if (regex.test(SiteName)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    emailHelp.classList.add("d-none");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    emailHelp.classList.remove("d-none");
    return false;
  }
}

function validSiteURL() {
  var regex =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
  var SiteUrl = siteUrl.value;
  if (regex.test(SiteUrl)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    SiteHelp.classList.add("d-none");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    SiteHelp.classList.remove("d-none");
    return false;
  }
}
