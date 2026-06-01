// app.js

document.addEventListener('DOMContentLoaded', () => {
    initMainNavigation();
    initFilterSelect();
    initRouteSearch();
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