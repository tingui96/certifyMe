import { createWorker, createScheduler } from 'tesseract.js';

export async function extractQuestionAndOptions(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const scheduler = createScheduler();
    for (let i = 0; i < 4; i++) {
      const worker = await createWorker('eng');
      scheduler.addWorker(worker)
    }
    // Extraer la pregunta
    let question = doc.querySelector('.title-question.text-xl.font-bold.leading-8').textContent.trim();
    // Extraer las opciones 
    let optionsNode = Array.from(doc.querySelector('#list-answers').querySelectorAll('.pl-2'))
    let options = optionsNode.map(span => span.textContent.trim())
   
    if(options.some(x => x === ''))
    {
      const result = await Promise.all(optionsNode.map(async span => {
        let url = span.querySelector('.answer-image.w-auto.max-w-full').getAttribute('src');
        return scheduler.addJob('recognize', url)
      }))
      options = result.map(x => x.data.text)
      await scheduler.terminate()
    }   
    return { question, options };
  }