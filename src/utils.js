export async function extractQuestion(htmlString) {
  try{
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    let question = doc.querySelector('.title-question.text-xl.font-bold.leading-8').textContent.trim();
    const questionImage = doc.querySelector('[alt="question-image"]');
    if(questionImage) {
      console.log(questionImage)
      let questionImageSrc = questionImage.getAttribute('src')
      const uploadedImageUrl = await uploadImageToCloudinary(questionImageSrc, "question");
      console.log(uploadedImageUrl)
      question = question + '\n' + uploadedImageUrl
    }
    return question
  }
  catch(e) {
    console.log(e)
    return ''
  }
    
}

export async function extractOptions(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    let optionsNode = Array.from(doc.querySelector('#list-answers').querySelectorAll('.pl-2'))
    let options = optionsNode.map(span => span.textContent.trim())
    let answerImg = doc.querySelector('[alt="answer"]')
    if(answerImg)
    {
      let optionsNodeImage = doc.querySelectorAll('[alt="answer"]')
      const optionArray = []
      for (let i = 0; i < optionsNodeImage.length; i++) {
        const element = optionsNodeImage[i].getAttribute('src');
        let resp = await uploadImageToCloudinary(element,"question")     
        optionArray.push('\n' + resp)
      }
      return optionArray
    }   
    return options ;
  }

  async function uploadImageToCloudinary(imageUrl, name) {  
    // Enviar la solicitud de carga a Cloudinary
    const response = await fetch(`https://cloudinary-ocr-api.onrender.com/api/cloudinary?url=${imageUrl}&name=${name}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  
    if (!response.ok) {
      throw new Error('Error al subir la imagen a Cloudinary');
    }
  
    const data = await response.json();
    return data;
  }