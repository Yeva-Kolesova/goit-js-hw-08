import throttle from 'lodash.throttle';

const refs = {
    formEl: document.querySelector('.feedback-form'),
};

refs.formEl.addEventListener('input', throttle(onFormElemInput, 500));
refs.formEl.addEventListener('submit', onFormElemSubmit);


function onFormElemInput(event) {
    const userForm = {};

    const formData = new FormData(refs.formEl);

    formData.forEach((value, key) => {
        userForm[key] = value;
    });

    save('userData', userForm);
}

function loadPage() {
    const data = load('userData') || {};

    for (const key of Object.keys(data)) {
        refs.formEl.elements[key].value = data[key];
    }
}

function onFormElemSubmit(event) {
    event.preventDefault();

    const data = load('userData');
    localStorage.removeItem('userData');
    event.target.reset();
    console.log(data);
}


loadPage();


function load(key) {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
}

function save(key, value) {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
}