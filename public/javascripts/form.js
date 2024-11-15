import {API_URL} from './api.js';
import {fetchChapters} from '../index.js';

const form = document.getElementById('chapterForm');
const errorsContainer = document.getElementById('errors');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const entries = formData.entries();
    const chapter = Object.fromEntries(entries);

    if (isValidChapter(chapter)) {
        const json = JSON.stringify(chapter);
        const response = await fetch(`${API_URL}/chapter`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: json
        });

        const responseData = await response.json();

        if (response.ok) {
            resetForms();
        } else {
            displayErrors([responseData.error.message]);
        }
    }

    await fetchChapters();
});

const isValidChapter = (chapter) => {
    let errors = [];

    if (!chapter.title || !chapter.nbLessons) {
        errors.push("Tous les champs sont obligatoires");
    }

    if (errors.length) {
        displayErrors(errors);
        return false;
    }

    return true;
}

const displayErrors = (errors) => {
    errorsContainer.innerHTML = '';
    errors.forEach(error => {
        const errorNode = document.createElement('li');
        errorNode.textContent = error;
        errorsContainer.appendChild(errorNode);
    });
}

const resetForms = () => {
    form.reset();
    errorsContainer.innerHTML = '';
}