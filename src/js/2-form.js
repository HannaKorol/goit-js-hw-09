// 1. Отримаємо посилання на форму, input, текстове поле, submit:
const form = document.querySelector(".feedback-form");  // Отримаємо посилання на форму (з посиланням на клас)
const inputEl = form.elements.email;                    // Отримаємо поcилання на input (в можливому іншому форматі)
const textarea = form.querySelector("textarea");        // Отримаємо поcилання на текстове поле (з посиланням на тег)
const formSubmit = form.querySelector("button");        // Отримаємо посилання на submit (отримано з форми, щоб уникнути можливих конфліктів)


// 2. Створення ключа для зберігання данних у локальне сховище
const STORAGE_KEY = "feedback-form-state";            
// (назва STORAGE_KEY з великих літер, бо не змінююється протягом виконання коду)

// 3.(1.) Оголошення поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }
const formData = {
    email: '', 
    message: '',
};

// 6. (2.1) Використовуй метод делегування для відстеження змін у формі через подію input.
form.addEventListener("input", handleInput); 


// 7. (2.2) Зберігай актуальні дані *з полів email та **message у formData та ***записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
function handleInput(event) {
    formData.email = inputEl.value.trim();                       //*зберігання данних з поля email до formData.email
    formData.message = textarea.value.trim();                    // **зберігання данних з поля message до formData.message
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // *** (2.3) зберігання даних у локальне сховище за ключем
}
//localStorage.setItem - це метод об'єкта localStorage, який використовується для зберігання даних у локальному сховищі браузера. Він приймає два параметри: ключ і значення. Значення буде збережено під цим ключем і буде доступне навіть після перезавантаження сторінки або закриття та повторного відкриття браузера.
//STORAGE_KEY - це ключ - використовується для доступу до відповідного запису у localStorage.
//JSON.stringify(formData) - це метод, який перетворює об'єкт JavaScript (formData) у рядок JSON. Локальне сховище може зберігати дані лише у вигляді рядків, тому необхідно перетворити об'єкт formData у рядок перед зберіганням.

// (3) При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
function loadSavedData() {
    const savedData = localStorage.getItem(STORAGE_KEY); // Повернення данних з локального сховища збереженим за ключем.
    if (savedData) {                                     // Перевіряємо, чи є збережені дані в локальному сховищі
        const parsedData = JSON.parse(savedData);        // Якщо дані є, парсимо їх з формату JSON до об'єкта JavaScript
        formData.email = parsedData.email || '';         // (3.2) Записуємо значення поля email з parsedData у об'єкт formData, або залишаємо порожнє значення, якщо його немає
        formData.message = parsedData.message || '';     // (3.2) Записуємо значення поля message з parsedData у об'єкт formData, або залишаємо порожнє значення, якщо його немає
        inputEl.value = formData.email;                  // Встановлюємо значення поля email у формі на значення з formData
        textarea.value = formData.message;               // Встановлюємо значення поля message у формі на значення з formData
    }
}

// Виклик функції для завантаження збережених даних при завантаженні сторінки
loadSavedData();

//Скасування стандартної поведінки браузера для відправлення форми, щоб ми могли обробити дані форми вручну.
form.addEventListener("submit", event => {
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
});