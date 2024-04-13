import { useState } from "react"
import copy from "copy-to-clipboard"
import { extractQuestionAndOptions } from "./utils"
import { Header } from "./components/Header"

function App() {
  const [inputText, setInputText] = useState('')
  const [result,setResult] = useState('')
  const HandleOnChange = (e) => {
    setInputText(e.target.value)
  }
  
  const HandleOnClick = () => {
    const { question, options } = extractQuestionAndOptions(inputText)
    let result = "No expliques nada solo dime el numero de la opcion correcta. Lee correctamente la pregunta y las opciones, es un examen y te voy a poner a prueba \n Pregunta: " + question
    options.forEach((option, index) => {
    result = result + `\n Opción ${index + 1}: ${option}`;
});
    setResult(result)
    setInputText('')
  }
  return (
    <>
    <Header/>
    <div className="flex justify-center gap-4 p-10">
      <div className="grid gap-4 p-3">
        <textarea className="text-area"
          id='textHtml' type='text'
          value={inputText} onChange={HandleOnChange}/>
        <div className="flex justify-center">
          <button className="btn-process"
            onClick={HandleOnClick} disabled={inputText===''}>Procesar</button>
        </div>
      </div>
      <div className="grid gap-4 p-3">
        <textarea className="text-area"
          id='response' readOnly type='text'
          value={result}/>
          <div className="flex justify-center">
            <button className="btn-copy"
              onClick={() => copy(result)}>Copiar</button>
          </div>
      </div>    
    </div>
    </>
  )
}

export default App
