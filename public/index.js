import {API_URL} from './javascripts/api.js';

const chaptersContainer = document.getElementById('chapters');
const searchInput = document.getElementById('searchInput');

export const fetchChapters = async () => {
    const response = await fetch(`${API_URL}/chapters`);
    const json = await response.json();

    const chapters = json.data;
    createChaptersDOM(chapters);
}

const createChaptersDOM = (chapters) => {
    const chaptersNodes = chapters.map(chapter => {
        const chapterNode = document.createElement('div');
        chapterNode.classList.add('chapter');
        chapterNode.innerHTML = `
            <h2>${chapter.title}</h2>
            <p>${chapter.nbLessons} leçons</p>
            <button class="btn btn-primary" data-id="${chapter._id}">Voir</button>
            <button class="btn btn-danger" data-id="${chapter._id}">Supprimer</button>
        `;

        return chapterNode;
    });

    chaptersContainer.innerHTML = '';
    chaptersContainer.append(...chaptersNodes);

    const deleteButtons = chaptersContainer.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async e => {
            const id = e.target.dataset.id;

            await fetch(`${API_URL}/chapter/${id}`, {
                method: 'DELETE'
            });

            await fetchChapters();
        });
    });

    const showButtons = chaptersContainer.querySelectorAll('.btn-primary');
    showButtons.forEach(button => {
        button.addEventListener('click', e => {
            const id = e.target.dataset.id;
            location.assign(`/chapter/public/show/chapter.html?id=${id}`);
        });
    });
}

searchInput.addEventListener('input', async (event) => {
    const query = event.target.value;
    const response = await fetch(`${API_URL}/chapters/search?title=${query}`);
    const json = await response.json();
    createChaptersDOM(json.data);
});

fetchChapters();