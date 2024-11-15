import {API_URL} from '../javascripts/api.js';

const chapterDetailsContainer = document.getElementById('chapterDetails');

const fetchChapterDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get('id');

    if (chapterId) {
        const response = await fetch(`${API_URL}/chapter/${chapterId}`);
        if (response.ok) {
            const json = await response.json();
            const chapter = json.data;
            displayChapterDetails(chapter);
        } else {
            chapterDetailsContainer.innerHTML = `<p>Chapter not found</p>`;
        }
    }
}

const displayChapterDetails = (chapter) => {
    chapterDetailsContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${chapter.title}</h2>
        <p class="text-gray-700 mb-4">${chapter.nbLessons} leçons</p>
          <p>${chapter.active ? 'Disponible' : 'Non disponible'}</p>
        <div class="flex gap-4">
            <button id="deleteButton" class="btn btn-danger">Supprimer</button>
        </div>
    `;

    document.getElementById('deleteButton').addEventListener('click', () => deleteChapter(chapter._id));
}

const deleteChapter = async (id) => {
    const response = await fetch(`${API_URL}/chapter/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Chapter deleted successfully');
        location.href = '/chapter/public/index.html';
    } else {
        alert('Failed to delete chapter');
    }
}

fetchChapterDetails();