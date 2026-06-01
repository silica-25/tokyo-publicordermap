// app.js

document.addEventListener('DOMContentLoaded', () => {
    initMainNavigation();
    initFilterSelect();
    initRouteSearch();
    loadColumns(); 
});

function initMainNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.main-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            const targetSectionId = btn.getAttribute('data-target');
            document.getElementById(targetSectionId).classList.add('active');
        });
    });
}

function initFilterSelect() {
    const select = document.getElementById('crime-type');
    const logicDesc = document.getElementById('logic-desc');
    const overlay = document.getElementById('loading-overlay');
    if (!select) return;

    select.addEventListener('change', (e) => {
        overlay.style.display = 'flex';
        setTimeout(() => {
            if(e.target.value === 'total_danger') logicDesc.textContent = '「対数_危険度レベル」に基づき、面積あたりの総合的な犯罪密度の高さをヒートマップ化しています。';
            if(e.target.value === 'tier1') logicDesc.textContent = '強盗や暴行など、身体的危険が伴う「Tier1_スコア」を強調表示します。';
            if(e.target.value === 'tier2') logicDesc.textContent = '空き巣や住宅対象侵入窃盗など、居住環境に直結する「Tier2_スコア」を強調表示します。';
            if(e.target.value === 'tier3') logicDesc.textContent = '万引きや自転車盗難など、日常的な「Tier3_スコア」を強調表示します。';
            overlay.style.display = 'none';
        }, 600);
    });
}

function initRouteSearch() {
    const btn = document.getElementById('search-route-btn');
    const resultCard = document.getElementById('route-result');
    const overlay = document.getElementById('loading-overlay');
    if (!btn) return;

    btn.addEventListener('click', () => {
        overlay.style.display = 'flex';
        resultCard.style.display = 'none';
        setTimeout(() => {
            overlay.style.display = 'none';
            resultCard.style.display = 'block';
            document.getElementById('res-dist').textContent = '約 2.4 km';
            document.getElementById('res-time').textContent = '徒歩 約 30分';
            document.getElementById('res-danger').textContent = '低（安全な大通り優先）';
        }, 1200);
    });
}

/**
 * 記事一覧をJSONから自動読み込み
 */
async function loadColumns() {
    const grid = document.getElementById('column-grid');
    if (!grid) return;

    try {
        const response = await fetch('./columns/list.json');
        const articles = await response.json();
        grid.innerHTML = ''; 

        articles.forEach(article => {
            const card = document.createElement('article');
            card.className = `column-card tag-${article.tier}`;
            card.innerHTML = `
                <div class="card-badge">${article.badge}</div>
                <div class="card-content">
                    <h3>${article.title}</h3>
                    <p class="card-summary">${article.summary}</p>
                    <div class="card-footer">
                        <span class="date">${article.date}</span>
                        <span class="read-time"><i class="fa-regular fa-clock"></i> ${article.time}</span>
                    </div>
                </div>
            `;
            
            // 【変更ポイント】クリック時にURLパラメータを付けてページ遷移
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.location.href = `article.html?file=${article.file}`;
            });
            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = '<p>記事を読み込めませんでした。</p>';
    }
}