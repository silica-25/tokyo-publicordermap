// app.js

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFilterSelect();
    initRouteSearch();
});

/**
 * タブの切り替え処理
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 全て非アクティブ化
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // クリックされたものをアクティブ化
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

/**
 * フィルター切り替え処理（将来の連携用モック）
 */
function initFilterSelect() {
    const select = document.getElementById('crime-type');
    const logicDesc = document.getElementById('logic-desc');
    const overlay = document.getElementById('loading-overlay');

    select.addEventListener('change', (e) => {
        const val = e.target.value;
        
        // ローディング表示の演出
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
                    logicDesc.textContent = '空き巣や自転車盗難など、生活に直結する「Tier2_スコア」を強調表示します。';
                    break;
                case 'tier3':
                    logicDesc.textContent = '万引きやその他刑法犯など「Tier3_スコア」を強調表示します。';
                    break;
            }
            console.log(`Filter changed to: ${val}`);
            
            overlay.style.display = 'none';
        }, 600);
    });
}

/**
 * 安全ルート検索の処理（将来の連携用モック）
 */
function initRouteSearch() {
    const btn = document.getElementById('search-route-btn');
    const startInput = document.getElementById('start-point');
    const endInput = document.getElementById('end-point');
    const resultCard = document.getElementById('route-result');
    const overlay = document.getElementById('loading-overlay');

    btn.addEventListener('click', () => {
        const start = startInput.value.trim();
        const end = endInput.value.trim();

        if (!start || !end) {
            alert('出発地と目的地を入力してください。');
            return;
        }

        // ローディング表示
        overlay.style.display = 'flex';
        resultCard.style.display = 'none';

        // 疑似処理
        setTimeout(() => {
            overlay.style.display = 'none';
            resultCard.style.display = 'block';
            
            // モックデータの挿入
            document.getElementById('res-dist').textContent = '約 2.4 km';
            document.getElementById('res-time').textContent = '徒歩 約 30分';
            document.getElementById('res-danger').textContent = '低（安全な大通り優先）';
            document.getElementById('res-danger').className = 'danger-low';
            document.getElementById('res-danger').style.color = '#27ae60';
        }, 1200);
    });
}