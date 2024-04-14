import { useState } from "react"
import copy from "copy-to-clipboard"
import { extractQuestionAndOptions } from "./utils"
import { Header } from "./components/Header"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Button } from "@nextui-org/react"

function App() {
  const [inputText, setInputText] = useState('')
  const [isLoading,setLoading] = useState(false)
  const [result,setResult] = useState('')
  const HandleOnChange = (e) => {
    setInputText(e.target.value)
  }
  
  const HandleOnClick = async () => {
    setLoading(true)
    const { question, options } = await extractQuestionAndOptions(inputText)
    let result = "No expliques nada solo dime el numero de la opcion correcta. Lee correctamente la pregunta y las opciones, es un examen y te voy a poner a prueba \n Pregunta: " + question
    options?.forEach((option, index) => {
    result = result + `\n Opción ${index + 1}: ${option}`;
});
    setResult(result)
    setInputText('')
    setLoading(false)
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
          <Button className="btn-process rounded-full" 
            onClick={HandleOnClick} isDisabled={inputText===''} isLoading={isLoading}>Procesar</Button>
        </div>
      </div>
      <div className="grid gap-4 p-3">
        <textarea className="text-area"
          id='response' readOnly type='text'
          value={result}/>
          <div className="flex justify-center">
            <Button className="btn-copy rounded-full" isDisabled={result===''}
              onClick={() => copy(result)}>Copiar</Button>
          </div>
      </div>    
    </div>
    <Analytics/>
    <SpeedInsights/>
    </>
  )
}

export default App
