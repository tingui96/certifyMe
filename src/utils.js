export function extractQuestionAndOptions(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Extraer la pregunta
    const question = doc.querySelector('.title-question.text-xl.font-bold.leading-8').textContent.trim();

    // Extraer las opciones
    const options = Array.from(doc.querySelector('#list-answers').querySelectorAll('.pl-2')).map(span => span.textContent.trim());
    console.log(options)

    return { question, options };
  }
