// 1. Отримаємо посилання на форму, input, текстове поле, submit:
const form = document.querySelector(".feedback-form");  // Отримаємо посилання на форму (з посиланням на клас)
const inputEl = form.elements.email;                    // Отримаємо поcилання на input (в можливому іншому форматі)
const textarea = form.querySelector("textarea");        // Отримаємо поcилання на текстове поле (з посиланням на тег)
const formSubmit = form.querySelector("button");        // Отримаємо посилання на submit (отримано з форми, щоб уникнути можливих конфліктів)


// 2. Створенний ключ для зберігання данних у локальне сховище
const STORAGE_KEY = "feedback-form-state";              // створенний ключ для зберігання данних у сховище
// (назва STORAGE_KEY з великих літер, бо не змінююється протягом виконання коду

// 3. (1.) Оголошення поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }
const formData = {
    email: '', 
    message: '',
};

// 4. (2.2) Повернення данних з локального сховища збереженим за ключем.
const savedData = localStorage.getItem(STORAGE_KEY); 


// 6. (2.) Використовуй метод делегування для відстеження змін у формі через подію input.
form.addEventListener("input", handleInput); 
form.addEventListener("submit", submitForm);


// 7. (2.1) Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
function handleInput(event) {
    formData.email = inputEl.value.trim(); //зберігання данних до formData.email
    formData.message = textarea.value.trim(); // зберігання данних до formData.message
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // зберігання даних у сховище
}

// 8. (2.2) Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
function submitForm(event) {
    event.preventDefault();

// 5. (3.) При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
let parsedData = {}; // Створюється порожній об'єкт parsedData. Він буде використовуватися для зберігання розпарсованих даних з localStorage.
if (savedData) {     // Перевірка наявності збережених даних у localStorage
    try {                                   // Використовується try...catch блок для спроби розпарсити збережені дані за допомогою JSON.parse(). Якщо дані є валідним JSON, вони будуть перетворені в об'єкт JavaScript і збережені в змінну parsedData.
        parsedData = JSON.parse(savedData);
    } catch (error) {
        console.error("Error parsing localStorage data:", error);
    }
}

formData.email = inputEl.value; // Зберігає поточне значення поля email у об'єкт formData
formData.message = textarea.value; // Зберігає поточне значення поля message у об'єкт formData

inputEl.value = parsedData.email || ''; // Заповнення поля email збереженим значенням або залишенням порожнім, якщо значення немає
textarea.value = parsedData.message || '';  // Заповнення поля message збереженим значенням або залишенням порожнім, якщо значення немає   

// 8. (2.2) Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
function submitForm(event) {
    event.preventDefault();


    // 9. (4.) Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». 
    if (!inputEl.value || !textarea.value) {
        return alert('Fill please all fields');
    }

    // 10. (4.1) Якщо всі поля заповнені, *виведи у консоль об’єкт formData з актуальними значеннями, **очисти локальне сховище, ***об’єкт formData і ****поля форми.
    console.log(formData);                //* виведення у консоль об’єкт formData з актуальними значеннями
    localStorage.removeItem(STORAGE_KEY); // ** очистка локального сховища
    formData.email = '';                  // *** очистка об’єкта formData (email)
    formData.message = '';                // *** очистка об’єкта formData (message)
    form.reset();                         // **** Очищення полів форми
}