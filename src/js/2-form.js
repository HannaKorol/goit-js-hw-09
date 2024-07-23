/* console.log("Form"); */


// 1. Отримаємо посилання на форму,input,текстове поле,submit:
const form = document.querySelector(".feedback-form"); //Отримаємо посилання на форму
const inputEl = form.elements.email; // Отримаємо поcилання на input
const textareaMessage = form.elements.message; // Отримаємо поcилання на текстове поле
const formSubmit = document.querySelector("button"); // Отримаємо посилання на submit

// 2. Створенний ключ для зберігання данних у локальне сховище
const STORAGE_KEY = "feedback-form-state"; // створенний ключ для зберігання данних у сховище


// 3. (1.) Оголошення поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
const formData = {
    email: "", 
    message: "",
};

// 4. (2.) Використовуй метод делегування для відстеження змін у формі через подію input.
form.addEventListener("input", handleInput);

       // 5. (2.1) Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
function handleInput(event) {
    formData.email = inputEl.value.trim();
    formData.message = textareaMessage.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // зберігання даних у сховище
}


//6. (2.2) Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
form.addEventListener("submit", submitForm);

//При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.




// 7. (2.2) Повернення данних з локального сховища збереженим за ключем.
const savedData = localStorage.getItem(STORAGE_KEY); 



// 7. (2.3) Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені, виведи у консоль об’єкт formData з актуальними значеннями, очисти локальне сховище, об’єкт formData і поля форми.
function submitForm(even) {
    event.preventDefault();
    if(!inputEl.value
    )
}