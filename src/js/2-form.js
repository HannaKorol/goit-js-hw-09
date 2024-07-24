
// 1. Отримаємо посилання на форму,input,текстове поле,submit:
const form = document.querySelector(".feedback-form");  //Отримаємо посилання на форму
const inputEl = form.elements.email;                    // Отримаємо поcилання на input
const textarea = form.querySelector("textarea");        // Отримаємо поcилання на текстове поле
const formSubmit = document.querySelector('button');    // Отримаємо посилання на submit


// 2. Створенний ключ для зберігання данних у локальне сховище
const STORAGE_KEY = "feedback-form-state";              // створенний ключ для зберігання данних у сховище


// 3. (1.) Оголошення поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
const formData = {
    email: '', 
    message: '',
};

// 4. (2.2) Повернення данних з локального сховища збереженим за ключем.
const savedData = localStorage.getItem(STORAGE_KEY); 


// 5. (2.) Використовуй метод делегування для відстеження змін у формі через подію input.
form.addEventListener("input", handleInput);

 // 6. (2.1) Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
function handleInput(event) {
    formData.email = inputEl.value.trim();
    formData.message = textarea.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // зберігання даних у сховище
}

//7. (3.) При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
let parsedData = {}; //Створюється порожній об'єкт parsedData. Він буде використовуватися для зберігання розпарсованих даних з localStorage.
if (savedData) {     //Перевірка наявності збережених даних у localStorage
try {                                   //Використовується try...catch блок для спроби розпарсити збережені дані за допомогою JSON.parse(). Якщо дані є валідним JSON, вони будуть перетворені в об'єкт JavaScript і збережені в змінну parsedData.
    parsedData = JSON.parse(savedData);
} catch (error) {}                      // Якщо виникне помилка (наприклад, якщо дані не є валідним JSON), catch блок перехопить помилку і залишить parsedData як порожній об'єкт.
}     

inputEl.value = parsedData.email || ''; // встановлює значення для елементу input (поля для введення email) з parsedData.email. Якщо parsedData.email не визначено, використовується порожній рядок.
textarea.value = parsedData.message || '';  //встановлює значення для елементу textarea (поля для введення повідомлення) з parsedData.message, або порожній рядок, якщо parsedData.message не визначено.

//8. (2.2) Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
form.addEventListener("submit", submitForm);
function submitForm(event) {
    event.preventDefault();


// 9. (4.) Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». 
if(!inputEl.value || !textarea.value) {
    return alert ('Fill please all fields');
}

// 10. (4.1) Якщо всі поля заповнені, *виведи у консоль об’єкт formData з актуальними значеннями,**очисти локальне сховище, ***об’єкт formData і ****поля форми.
console.log(formData);                //*виведення у консоль об’єкт formData з актуальними значеннями
localStorage.removeItem(STORAGE_KEY); //**очистка локального сховища,
formData.email ='';                   //***очистка об’єкта formData (email)
formData.message ='';                 //***очистка об’єкта formData (message)
form.reset()                          //****Очищення полів форми
}