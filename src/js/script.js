document.addEventListener('DOMContentLoaded', () => {
    console.log("JS завантажено успішно!");

    // 1. Зміна імені
    const nameElement = document.getElementById('personName');
    if (nameElement) {
        nameElement.textContent = 'Anna Horodiuk';
    }

    // 2. Акордеон (Стрілки та приховування)
    const headers = document.querySelectorAll('.toggle-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            // Знаходимо контент (наступний елемент після заголовка)
            const content = header.nextElementSibling;
            // Знаходимо стрілку всередині заголовка
            const arrow = header.querySelector('.arrow-icon');

            // Перемикаємо класи
            if (content) content.classList.toggle('is-hidden');
            if (arrow) arrow.classList.toggle('rotate-180');
        });
    });

    // 3. Генерація досвіду роботи (Масив)
    const experienceData = [
        {
            position: 'Web Designer',
            years: '2020 - Present',
            company: 'Creative Agency / Chicago',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'
        },
        {
            position: 'Graphic Designer',
            years: '2015 - 2020',
            company: 'Creative Market / Chicago',
            description: 'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.'
        },
        {
            position: 'Marketing Manager',
            years: '2013 - 2015',
            company: 'Manufacturing Agency / NJ',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.'
        }
    ];

    const container = document.getElementById('job-experience-container');
    if (container) {
        container.innerHTML = ''; // Очистка контейнера перед вставкою
        
        experienceData.forEach(job => {
            const div = document.createElement('div');
            div.classList.add('mb-3');
            div.innerHTML = `
                <div class="d-flex justify-content-between align-items-end mb-0">
                    <h6 class="fw-bold text-uppercase mb-0">${job.position}</h6>
                    <span class="small fw-bold">${job.years}</span>
                </div>
                <div class="small text-muted fst-italic fw-semibold mb-1">${job.company}</div>
                <p class="small text-muted lh-sm text-justify">${job.description}</p>
            `;
            container.appendChild(div);
        });
    }
});