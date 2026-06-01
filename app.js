// app.js

document.addEventListener('DOMContentLoaded', () => {
    initMainNavigation();
    initFilterSelect();
    initRouteSearch();
    loadColumns();
});

/**
 * 1. 上部メインナビゲーション（大メニュー）の切り替え処理
 */
function initMainNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.main-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 全てのボタンから active クラスを外す
            navBtns.forEach(b => b.classList.remove('active'));
            // 全てのセクション（画面）を非表示にする
            sections.forEach(s => s.classList.remove('active'));

            // クリックされたボタンをアクティブにする
            btn.classList.add('active');
            
            // ボタンが持つ「data-target」に指定されたIDのセクションを表示する
            const targetSectionId = btn.getAttribute('data-target');
            document.getElementById(targetSectionId).classList.add('active');
        });
    });
}

/**
 * 2. フィルター切り替え処理（将来のデータ連携用モック）
 */
function initFilterSelect() {
    const select = document.getElementById('crime-type');
    const logicDesc = document.getElementById('logic-desc');
    const overlay = document.getElementById('loading-overlay');

    if (!select) return;

    select.addEventListener('change', (e) => {
        const val = e.target.value;
        
        // ローディング表示を出す
        overlay.style.display = 'flex';
        
        setTimeout(() => {
            switch(val) {
                case 'total_danger':
                    logicDesc.textContent = '「対数_危険度レベル」に基づき、面積あたりの総合的な犯罪密度の高さをヒートマップ化しています。';
                    break;
                case 'tier1':
                    logicDesc.textContent = '強盗や暴行など、身体的危険が伴う「Tier1_スコア」を強調表示します。';
                    break;
                case 'tier2':
                    logicDesc.textContent = '空き巣や住宅対象侵入窃盗など、居住環境に直結する「Tier2_スコア」を強調表示します。';
                    break;
                case 'tier3':
                    logicDesc.textContent = '万引きや自転車盗難、ひったくりなど、日常的な「Tier3_スコア」を強調表示します。';
                    break;
            }
            console.log(`Filter changed to: ${val}`);
            
            // ローディングを消す
            overlay.style.display = 'none';
        }, 600);
    });
}

/**
 * 3. 安全ルート検索の処理（将来のルーティングAPI連携用モック）
 */
function initRouteSearch() {
    const btn = document.getElementById('search-route-btn');
    const startInput = document.getElementById('start-point');
    const endInput = document.getElementById('end-point');
    const resultCard = document.getElementById('route-result');
    const overlay = document.getElementById('loading-overlay');

    if (!btn) return;

    btn.addEventListener('click', () => {
        const start = startInput.value.trim();
        const end = endInput.value.trim();

        if (!start || !end) {
            alert('出発地と目的地を入力してください。');
            return;
        }

        overlay.style.display = 'flex';
        resultCard.style.display = 'none';

        setTimeout(() => {
            overlay.style.display = 'none';
            resultCard.style.display = 'block';
            
            document.getElementById('res-dist').textContent = '約 2.4 km';
            document.getElementById('res-time').textContent = '徒歩 約 30分';
            document.getElementById('res-danger').textContent = '低（安全な大通り優先）';
            
            console.log(`Route searched from ${start} to ${end}`);
        }, 1200);
    });
}

/**
 * 4. コラムの自動読み込みと表示（ヘッドレスCMS風の実装）
 */
async function loadColumns() {
    const grid = document.getElementById('column-grid');
    if (!grid) return;

    try {
        // columns/list.json を読み込む
        const response = await fetch('./columns/list.json');
        const articles = await response.json();
        
        grid.innerHTML = ''; // ローディング表示を消す

        // jsonのデータをもとにカードを自動生成
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
            
            // カードをクリックしたら記事を開く
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => openArticle(article.file));
            grid.appendChild(card);
        });

    } catch (error) {
        console.error("記事リストの読み込みに失敗しました", error);
        grid.innerHTML = '<p>記事を読み込めませんでした。</p>';
    }
}

/**
 * Markdownファイルを読み込んで表示する
 */
async function openArticle(filename) {
    const modal = document.getElementById('article-modal');
    const articleBody = document.getElementById('article-body');
    
    articleBody.innerHTML = '<div class="spinner" style="margin: 50px auto;"></div>';
    modal.style.display = 'flex'; // モーダルを表示

    try {
        // .md ファイルをフェッチして取得
        const response = await fetch(`./columns/${filename}`);
        const markdownText = await response.text();
        
        // marked.js を使って Markdown を HTML に変換
        articleBody.innerHTML = marked.parse(markdownText);
    } catch (error) {
        articleBody.innerHTML = '<p>記事データの取得に失敗しました。</p>';
    }
}

// モーダルを閉じる処理
document.getElementById('close-modal')?.addEventListener('click', () => {
    document.getElementById('article-modal').style.display = 'none';
});