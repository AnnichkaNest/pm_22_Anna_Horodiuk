document.addEventListener('DOMContentLoaded', () => {
    console.log("JS Start...");

    // 1. АКОРДЕОН
    const headers = document.querySelectorAll('.toggle-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const arrow = header.querySelector('.arrow-icon');
            if (content) content.classList.toggle('is-hidden');
            if (arrow) arrow.classList.toggle('rotate-180');
        });
    });

    // 2. ЗАВАНТАЖЕННЯ ДАНИХ
    loadData();

    function loadData() {
        fetch('data.json')
            .then(res => {
                if (!res.ok) throw new Error('Fail');
                return res.json();
            })
            .then(data => {
                // --- HEADER ---
                document.getElementById('personName').textContent = `${data.personalData.firstName} ${data.personalData.lastName}`;
                document.getElementById('personPosition').textContent = data.personalData.position;
                renderContacts(data.contacts);

                // --- LEFT COLUMN ---
                document.getElementById('about-container').textContent = data.aboutMe;
                renderSkills(data.skills, 'skills-container');
                renderLanguages(data.languages);
                renderSkills(data.hobbies, 'hobbies-container'); // Хобі мають таку ж структуру як скіли

                // --- RIGHT COLUMN ---
                renderJobExperience(data.jobExperience);
                renderEducation(data.education);
                renderReferences(data.references);
            })
            .catch(err => console.error(err));
    }

    // --- ФУНКЦІЇ РЕНДЕРУ ---

    function renderContacts(contacts) {
        const container = document.getElementById('contacts-container');
        if(!container) return;
        container.innerHTML = `
            <li class="d-flex mb-3">
                <span class="bg-white text-dark d-flex justify-content-center align-items-center me-3 icon-box-xs"><i class="fa-solid fa-phone"></i></span>
                <div>${contacts.phone.join('<br>')}</div>
            </li>
            <li class="d-flex mb-3">
                <span class="bg-white text-dark d-flex justify-content-center align-items-center me-3 icon-box-xs"><i class="fa-solid fa-globe"></i></span>
                <div>${contacts.web.join('<br>')}</div>
            </li>
            <li class="d-flex">
                <span class="bg-white text-dark d-flex justify-content-center align-items-center me-3 icon-box-xs"><i class="fa-solid fa-location-dot"></i></span>
                <div>${contacts.address.join('<br>')}</div>
            </li>
        `;
    }

    function renderSkills(list, containerId) {
        const container = document.getElementById(containerId);
        if(!container) return;
        container.innerHTML = '';
        list.forEach(item => {
            container.innerHTML += `
                <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="skill-label text-nowrap">${item.name}</div> 
                    <div class="progress border border-dark rounded-0 bg-transparent skill-track">
                        <div class="progress-bar bg-dark" role="progressbar" style="width: ${item.level}"></div>
                    </div>
                </div>`;
        });
    }

    function renderLanguages(list) {
        const container = document.getElementById('languages-container');
        if(!container) return;
        container.innerHTML = list.map(lang => `<span class="language-tag">${lang}</span>`).join('');
    }

    function renderJobExperience(jobs) {
        const container = document.getElementById('job-experience-container');
        if(!container) return;
        container.innerHTML = '';
        jobs.forEach(job => {
            container.innerHTML += `
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-end mb-0">
                        <h6 class="fw-bold text-uppercase mb-0">${job.position}</h6>
                        <span class="small fw-bold">${job.years}</span>
                    </div>
                    <div class="small text-muted fst-italic fw-semibold mb-1">${job.company}</div>
                    <p class="small text-muted lh-sm text-justify">${job.description}</p>
                </div>`;
        });
    }

    function renderEducation(edu) {
        const container = document.getElementById('education-container');
        if(!container) return;
        container.innerHTML = '';
        edu.forEach(item => {
            container.innerHTML += `
                <div class="col-6">
                    <div class="small fw-bold text-uppercase mb-1">${item.university}</div>
                    <div class="small text-muted fst-italic mb-0">${item.degree}</div>
                    <div class="small fw-bold mt-1">${item.years}</div>
                </div>`;
        });
    }

    function renderReferences(refs) {
        const container = document.getElementById('references-container');
        if(!container) return;
        container.innerHTML = '';
        refs.forEach(item => {
            container.innerHTML += `
                <div class="mb-3">
                    <div class="fw-bold text-uppercase mb-1">${item.name}</div>
                    <div class="small text-muted lh-sm">${item.address}</div>
                    <div class="small text-muted lh-sm">Tel: ${item.phone}</div>
                    <div class="small text-muted lh-sm">Email: ${item.email}</div>
                </div>`;
        });
    }
});