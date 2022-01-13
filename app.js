// HTML 上の要素を js で操作するために取得する
const textEl = document.querySelector("#js-text");
const analyzeButton = document.querySelector("#js-Button-analyze");
const resultEls = {
  aware: document.querySelector("#js-result-item-aware"),
  haji: document.querySelector("#js-result-item-haji"),
  ikari: document.querySelector("#js-result-item-ikari"),
  iya: document.querySelector("#js-result-item-iya"),
  kowa: document.querySelector("#js-result-item-kowa"),
  odoroki: document.querySelector("#js-result-item-odoroki"),
  suki: document.querySelector("#js-result-item-suki"),
  takaburi: document.querySelector("#js-result-item-takaburi"),
  yasu: document.querySelector("#js-result-item-yasu"),
  yorokobi: document.querySelector("#js-result-item-yorokobi"),
};

/**
 * onClick
 * 「解析する」ボタンがクリックされたときに呼び出される関数
 */
const onClick = () => {


  /**resultEls.suki.innerText = 'suki';
  resultEls.yorokobi.innerText = 'yorokobi';
  resultEls.suki.style.backgroundColor='';
  resultEls.yorokobi.style.backgroundColor='';**/

  Object.keys(resultEls).forEach(function(hogehoge) {
    resultEls[hogehoge].innerText = hogehoge;
    resultEls[hogehoge].style.backgroundColor='';
    //console.log(hogehoge);
  });

  // <p id="js-text"></p> 内のテキストを取得する
  const text = textEl.value;
  // サーバーのプログラム（Python）に送るデータの入れ物を用意する
  const params = new URLSearchParams();

  console.log(text);

  // 解析するテキストを積み込む
  params.append("text", text);

  axios
    // axios を使ってサーバーに置いてあるプログラム（Python）の場所（URL）を指定して呼び出す
    .post(
      "https://b5g1aapaxf.execute-api.ap-northeast-1.amazonaws.com",
      params,
    )
    .then((response) => {
      // サーバーとの通信が正常に終了した時の処理
      const { emotion } = response.data;

      console.log('解析結果 →', response);

      if (emotion === null) {
        alert('この文章には感情を表現する成分が含まれていませんでした。');
      }

      // 解析結果から取得できた感情の合計値を算出する
      const total = Object.keys(emotion).reduce((count, key) => {
        return count + emotion[key].length;
      }, 0);



      Object.keys(emotion).forEach((key) => {
        resultEls[key].style.backgroundColor = "#ccc";
        resultEls[key].innerText = `${resultEls[key].innerText} : ${emotion[key].length / total * 100}%`;
      });
    })
    .catch((error) => {
      // サーバーとの通信でエラーがあった時に表示する
      console.log(error);
    });
};

// 「解析する」ボタンがクリックされたときに呼び出される関数（onClick）を登録する
analyzeButton.addEventListener("click", onClick);