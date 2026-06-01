// article.js

document.addEventListener('DOMContentLoaded', () => {
    displayArticle();
});

/**
 * URLパラメータからファイル名を取得し、Markdownをレンダリングする
 */
async function displayArticle() {
    const contentArea = document.getElementById('article-content');
    
    // 1. URLから「?file=〇〇.md」の部分を解析して取得する
    const urlParams = new URLSearchParams(window.location.search);
    const filename = urlParams.get('file');

    if (!filename) {
        contentArea.innerHTML = '<p>記事が指定されていません。</p>';
        return;
    }

    try {
        // 2. 指定されたMarkdownファイルをフォルダから読み込む
        const response = await fetch(`./columns/${filename}`);
        if (!response.ok) throw new Error('ファイルが見つかりません');
        
        const markdownText = await response.text();
        
        // 3. marked.jsライブラリを使ってHTMLに変換して画面に流し込む
        contentArea.innerHTML = marked.parse(markdownText);
        
    } catch (error) {
        console.error(error);
        contentArea.innerHTML = '<p>記事の読み込みに失敗しました。ファイルが存在するか確認してください。</p>';
    }
}