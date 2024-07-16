let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let input = document.querySelector(".search");
let go = document.querySelector("#go");
let mean = document.querySelector(".meaning");
let part = document.querySelector(".pos");
let eg = document.querySelector(".example");
let content = document.querySelector(".content");
let text = document.querySelector(".word");
let audiobtn = document.querySelector(".play");


audiobtn.addEventListener("click",async ()=>{
    let worrdd = input.value;
    let voicelink =  await audio(worrdd);
    let voice = new Audio(voicelink);
    if(worrdd!="" && content.style.display!="none"){
        voice.play();
    }
    else if (worrdd=="") alert("Please Enter Word!");
    
})
go.addEventListener("click",async ()=>{
    let word = input.value;
    if(word!=""){
        mean.innerText="";
        part.innerText="";
        eg.innerText="";
        // input.value="";
        content.style.display="none";
        mean.innerText = await meaning(word);
        content.style.display="block";
        text.innerText = word;
        part.innerText =await partofspeech(word);
        eg.innerText = await example(word);
        
    }
    else{
        alert("Please Enter Word!");
    }

})

async function meaning(words){
    try{
        let res = await axios.get(url+words);
        console.log("meaning :",res.data[0].meanings[0].definitions[0].definition);
        return res.data[0].meanings[0].definitions[0].definition;
    } catch{
        console.log("Wrong Word Entered");
        return "Wrong Word Entered!";
    }
}


async function partofspeech(words){
    try{
        let res = await axios.get(url+words);
        console.log("Part of speech :",res.data[0].meanings[0].partOfSpeech);
        return res.data[0].meanings[0].partOfSpeech;
    } catch{
      console.log("Wrong Word Entered");
      return "Wrong Word Entered!";
    }
}


async function audio(words){
    
        let res = await axios.get(url+words);
        console.log(res.data[0].phonetics[0].audio);
        return res.data[0].phonetics[0].audio;
    
 
//  let audiolink = res.data[0].phonetics[0].audio
//  let sound = document.createElement("audio");
//  sound.setAttribute("src",audiolink );
//  let btn = document.querySelector(".play");
//  btn.addEventListener("click",()=>{
//    sound.play();
//  })
}


async function example(words){
    try{
        let res = await axios.get(url+words);
        console.log("Example :",res.data[0].meanings[0].definitions[0].example);
        return res.data[0].meanings[0].definitions[0].example
    } catch{
        return "Wrong Word Entered!";
    }
}


