let body = document.getElementById("hero");

let htmlContent = ` <p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;

let plainText = `Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------`;

let plainTextPositions = [
  {
      start: 241,
      end: 247,
  },
  {
      start: 518,
      end: 525,
  },
]
String.prototype.replaceAt = function(index, replacement, wordLen) {
  return this.substring(0, index) + replacement + this.substring(index + wordLen);
}

const highlightHTMLContent = (htmlContent, plainText, plainTextPositions) => {

  let filteredIndex;
  let words = plainTextPositions.map((wordPositions) => {
   
    let { start, end } = wordPositions;
    let word = plainText.slice(start, end); 
    let index = plainText.indexOf(word);

    let occurences = [];
    while(index != -1){
      occurences = [...occurences,index];        
      index = plainText.indexOf(`${word}`,index+1)
    }

    occurences.find((wordOccurence, index)=> {
      if(wordOccurence === start){
        filteredIndex = index;
      }      
    })
    
    return {
      word,
      filteredIndex
    }

  });

  console.log(words,'words details from plain text');

  words.map((wordObj)=>{
    console.log('wordObj from plain text:',wordObj);

    let regex = new RegExp(`${wordObj.word}`, "ig");
    let htmlWordObj = htmlContent.matchAll(regex);
    let wordsArray = Array.from(htmlWordObj);
    let matchedWordObj = wordsArray[wordObj.filteredIndex];

    console.log('matched words in html: ',matchedWordObj)

    let matchedIndex = matchedWordObj.index;
    let matchedWord = matchedWordObj[0];
    htmlContent = htmlContent.replaceAt(matchedIndex,`<mark>${matchedWord}</mark>`,matchedWord.length);

  })
  return htmlContent;
};

body.innerHTML = highlightHTMLContent(
  htmlContent,
  plainText,
  plainTextPositions
);

console.log(body.innerHTML);