import { createWorker, createScheduler } from 'tesseract.js';

export async function extractQuestion(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    let question = doc.querySelector('.title-question.text-xl.font-bold.leading-8').textContent.trim();
    const questionImage = doc.querySelector('[alt="question-image"]');
    if (questionImage) {
      const worker = await createWorker('eng',2)
 
      const imageResult = await worker.recognize(questionImage.getAttribute('src'))
      console.log(imageResult)
      question = question + ' \n' + imageResult.data.text
      await worker.terminate();
    }
    return question
}

export async function extractOptions(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const scheduler = createScheduler();
    for (let i = 0; i < 4; i++) {
      const worker = await createWorker('eng',2);
     
      scheduler.addWorker(worker)
    }

    let optionsNode = Array.from(doc.querySelector('#list-answers').querySelectorAll('.pl-2'))
    let options = optionsNode.map(span => span.textContent.trim())
    let answerImg = doc.querySelector('[alt="answer"]')
    if(answerImg)
    {
      answerImg = doc.querySelectorAll('[alt="answer"]')
      answerImg = answerImg.map(x => x.getAttribute('src'))
      const result = await Promise.all(answerImg.map(async url => {
        return scheduler.addJob('recognize', url)
      }))
      options = result.map(x => x.data.text)
      await scheduler.terminate()
    }   
    return options ;
  }