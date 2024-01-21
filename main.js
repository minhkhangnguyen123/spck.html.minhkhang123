let users = []
function register() {
    let fname_input = document.getElementById('fname-input').value

    let email_input = document.getElementById('email-input').value
    let password_input = document.getElementById('password-input').value
    let user = {
        fname: fname_input,

        email: email_input,
        password: password_input

    }
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    document.getElementById('fname-input').value = ''

    document.getElementById('email-input').value = ''
    document.getElementById('password-input').value = ''
}
function checkInputValue(value1, value2) {
    if (value1 == value2) {
        return true
    }
    return false
}
function login() {
    let email_input = document.getElementById('email-input').value
    let password_input = document.getElementById('password-input').value
    let userStorage = JSON.parse(localStorage.getItem('users'))
    for (let i = 0; i < userStorage.length; i++) {
        if (checkInputValue(email_input, userStorage[i].email)) {
            if (checkInputValue(password_input, userStorage[i].password)) {
                alert('login sucessfully!')
                return
            } else {
                alert('Wrong password!')
                return
            }
        } else {
            alert('User is not existed!')
            return
        }
    }
}

// async function fetchDataFromJSONFile(filePath) {
//     try {
//         const response = await fetch(filePath);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data from JSON file. Status code: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error:', error);
//         return null;
//     }
// }


const filePath = 'data.json';

function activeSlide() {

    //service section owl carousel
    $("#data-food").owlCarousel({
        autoplay: true,
        loop: true,
        margin: 20,
        autoHeight: true,
        nav: true,
        navText: [
            '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            991: {
                items: 4,
            },
        },
    });
}

let foodarea = document.getElementById('data-food')

function createItemElement(itemData) {
    for (let i = 0; i < itemData.length; i++) {
        console.log(itemData[i])
        let itemTemplate = `
        <div class="item col-4" style="height: 85vh;">
        <div class="box">
          <div class="img-box">
            <img src="${itemData[i].image}" alt="">
          </div>
          <div class="detail-box">
            <h4>
              ${itemData[i].title}
            </h4>
            <h6 class="price">
              <span class="new_price">
                ${itemData[i].newprice}
              </span>
              <span class="old_price">
                ${itemData[i].oldprice}
              </span>
            </h6>
            <button type="button" onclick="addProduct(this)"> <i class="fa fa-shopping-basket" aria-hidden="true"></i>
              Add
              To Cart</button>
          </div>
        </div>
      </div>
    `;
        foodarea.innerHTML += itemTemplate;
    }



}


init()

function init() {
    getProductAPI()
}

async function getProductAPI() {
    let data = await fetch(filePath)
        .then(response => response.json()) // lấy dữ liệu từ fetch('link j đó)lưu vào data
        .then(json => json)//chuyển response thành json sau đó đổi thành array/object và lưu vào biến data
    console.log(data)
    createItemElement(data)
}

let id = 0
let total = 0
let cartBody = document.getElementById("cart-body")
let cartTotal = document.getElementById("total-price")
let cartBtn = document.getElementById("cart-btn")
let cartWrapper = document.getElementById("cart-wrapper")
cartBtn.addEventListener("click", () => {
    cartWrapper.classList.toggle("cart-on")
})


let addProduct = (event) => {
    console.log(event.parentElement.childNodes);
    let price = event.parentElement.childNodes[3].childNodes[1].innerText
    let title = event.parentElement.childNodes[1].innerText
    id += 1
    total += parseInt(price)
    let output = `
    <tr>
            <td>${id}</td>
            <td>${title}</td>
            <td>VNĐ${price}</td>
          </tr>`

    cartBody.innerHTML += output
    cartTotal.innerHTML = total
}