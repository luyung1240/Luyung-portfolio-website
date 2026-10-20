let currentLang = localStorage.getItem('site_lang') || 'en';
let projectsData = [];
let experienceData = [];

const i18n = {
    en: {
        navName: "Maya Nelson",
        navTitle: "/ PROJECT MANAGER",
        navAbout: "ABOUT ME",
        navResume: "RESUME",
        navProjects: "PROJECTS",
        cardName: "Maya<br>Nelson",
        cardTitle: "PROJECT MANAGER",
        heroTitle: "Hello",
        heroSubtitle: "Here's who I am & what I do",
        btnResume: "RESUME",
        btnProjects: "PROJECTS",
        heroP1: "I'm a certified Senior Project Manager with over 8 years of experience leading cross-functional tech teams and driving agile product delivery.",
        heroP2: "My approach centers on collaborative leadership, proactive risk management, and fostering open communication across engineering, design, and executive stakeholders.",
        projectsHeaderTitle: "Projects",
        projectsHeaderSubtitle: "A showcase of strategic cross-functional campaigns, digital transformations, and technical products delivered.",
        resumeHeaderTitle: "Resume",
        resumeHeaderSubtitle: "Experienced in Agile management, software delivery, and cross-functional team coordination.",
        resumeSkillsHeading: "Skills & Expertise",
        skillCat1: "Methodologies",
        skillCat2: "Tools & Software",
        skillCat3: "Certifications",
        resumeExpHeading: "Work Experience",
        footerCopy: "© 2026 Maya Nelson. All rights reserved.",
        footerTag: "Designed with Sage Green accent & Asymmetric layout."
    },
    zh: {
        navName: "瑪雅·尼爾森",
        navTitle: "/ 專案經理",
        navAbout: "關於我",
        navResume: "履歷",
        navProjects: "作品集",
        cardName: "瑪雅·尼爾森<br><span style='font-size:1.1rem; font-weight:600;'>Maya Nelson</span>",
        cardTitle: "專案經理",
        heroTitle: "你好",
        heroSubtitle: "這是我的自我介紹與專業領域",
        btnResume: "查看履歷",
        btnProjects: "瀏覽作品",
        heroP1: "我是擁有超過8年經驗的資深技術專案經理，專精於領導跨領域團隊與推進敏捷產品開發。",
        heroP2: "我的核心理念強調團隊協同領導、主動風險管理，並在工程、設計與高層決策者之間建立透明順暢的溝通管道。",
        projectsHeaderTitle: "作品集",
        projectsHeaderSubtitle: "展示跨部門專案執行、數位轉型及成功的技術產品交付案例。",
        resumeHeaderTitle: "個人履歷",
        resumeHeaderSubtitle: "具備敏捷開發管理、軟體交付及跨團隊溝通協調之豐富實戰經驗。",
        resumeSkillsHeading: "專業技能",
        skillCat1: "管理方法論",
        skillCat2: "管理工具",
        skillCat3: "專業證照",
        resumeExpHeading: "工作經歷",
        footerCopy: "© 2026 瑪雅·尼爾森 Maya Nelson. 保留所有權利。",
        footerTag: "採用鼠尾草綠點綴與雙層不對稱美學設計。"
    }
};

// 載入 JSON 資料
async function initSite() {
    const pageType = document.body.dataset.page;

    try {
        if (pageType === 'projects') {
            const res = await fetch('data/projects.json');
            projectsData = await res.json();
        } else if (pageType === 'resume') {
            const res = await fetch('data/experience.json');
            experienceData = await res.json();
        }
    } catch (err) {
        console.error("載入 JSON 資料失敗:", err);
    }

    renderUI();
}

function renderUI() {
    const txt = i18n[currentLang];

    // 通用 Navbar & Footer
    if(document.getElementById('nav-name')) document.getElementById('nav-name').textContent = txt.navName;
    if(document.getElementById('nav-title')) document.getElementById('nav-title').textContent = txt.navTitle;
    if(document.getElementById('nav-about')) document.getElementById('nav-about').textContent = txt.navAbout;
    if(document.getElementById('nav-resume')) document.getElementById('nav-resume').textContent = txt.navResume;
    if(document.getElementById('nav-projects')) document.getElementById('nav-projects').textContent = txt.navProjects;
    if(document.getElementById('footer-copy')) document.getElementById('footer-copy').innerHTML = txt.footerCopy;
    if(document.getElementById('footer-tag')) document.getElementById('footer-tag').innerHTML = txt.footerTag;

    // 語言按鈕狀態
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.innerHTML = currentLang === 'en' 
            ? `<span class="active-lang">EN</span> | <span>中文</span>`
            : `<span>EN</span> | <span class="active-lang">繁中</span>`;
    }

    const pageType = document.body.dataset.page;

    // About Me 頁面渲染
    if (pageType === 'about') {
        if(document.getElementById('card-name')) document.getElementById('card-name').innerHTML = txt.cardName;
        if(document.getElementById('card-title')) document.getElementById('card-title').textContent = txt.cardTitle;
        if(document.getElementById('hero-title')) document.getElementById('hero-title').textContent = txt.heroTitle;
        if(document.getElementById('hero-subtitle')) document.getElementById('hero-subtitle').textContent = txt.heroSubtitle;
        if(document.getElementById('btn-resume')) document.getElementById('btn-resume').textContent = txt.btnResume;
        if(document.getElementById('btn-projects')) document.getElementById('btn-projects').textContent = txt.btnProjects;
        if(document.getElementById('hero-p1')) document.getElementById('hero-p1').textContent = txt.heroP1;
        if(document.getElementById('hero-p2')) document.getElementById('hero-p2').textContent = txt.heroP2;
    }

    // Projects 頁面渲染
    if (pageType === 'projects') {
        if(document.getElementById('projects-header-title')) document.getElementById('projects-header-title').textContent = txt.projectsHeaderTitle;
        if(document.getElementById('projects-header-subtitle')) document.getElementById('projects-header-subtitle').textContent = txt.projectsHeaderSubtitle;
        
        const container = document.getElementById('full-projects-container');
        if (container && projectsData.length > 0) {
            container.innerHTML = projectsData.map(p => `
                <article class="project-card">
                    <div class="project-img-wrapper">
                        <img class="project-img" src="${p.image}" alt="${p.title[currentLang]}" loading="lazy">
                    </div>
                    <div class="project-content">
                        <span class="project-tag">${p.category[currentLang]}</span>
                        <h3 class="project-title">${p.title[currentLang]}</h3>
                        <p class="project-desc">${p.description[currentLang]}</p>
                        <div>
                            <a href="${p.linkUrl}" class="link-btn">
                                ${p.linkText[currentLang]} &rarr;
                            </a>
                        </div>
                    </div>
                </article>
            `).join('');
        }
    }

    // Resume 頁面渲染
    if (pageType === 'resume') {
        if(document.getElementById('resume-header-title')) document.getElementById('resume-header-title').textContent = txt.resumeHeaderTitle;
        if(document.getElementById('resume-header-subtitle')) document.getElementById('resume-header-subtitle').textContent = txt.resumeHeaderSubtitle;
        if(document.getElementById('resume-skills-heading')) document.getElementById('resume-skills-heading').textContent = txt.resumeSkillsHeading;
        if(document.getElementById('skill-cat-1')) document.getElementById('skill-cat-1').textContent = txt.skillCat1;
        if(document.getElementById('skill-cat-2')) document.getElementById('skill-cat-2').textContent = txt.skillCat2;
        if(document.getElementById('skill-cat-3')) document.getElementById('skill-cat-3').textContent = txt.skillCat3;
        if(document.getElementById('resume-exp-heading')) document.getElementById('resume-exp-heading').textContent = txt.resumeExpHeading;

        const container = document.getElementById('experience-list-container');
        if (container && experienceData.length > 0) {
            container.innerHTML = experienceData.map(exp => `
                <div class="resume-item">
                    <div class="resume-date">${exp.date}</div>
                    <h3 class="resume-role">${exp.role[currentLang]}</h3>
                    <p class="resume-company">${exp.company}</p>
                    <p style="font-size: 0.9rem; color: var(--color-text-muted);">${exp.desc[currentLang]}</p>
                </div>
            `).join('');
        }
    }
}

// 切換語言並保持記錄
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('site_lang', currentLang);
    renderUI();
}

window.addEventListener('DOMContentLoaded', initSite);