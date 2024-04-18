import { useState } from "react"
import copy from "copy-to-clipboard"
import { extractQuestion, extractOptions, Process } from "./utils"
import { Header } from "./components/Header"
import { Button } from "@nextui-org/react"

function App() {
  const [inputText, setInputText] = useState('')
  const [isLoading,setLoading] = useState(false)
  const [result,setResult] = useState('')
  
  const HandleOnClick = async () => {
    setLoading(true)
    try{
          let [tab] = await chrome.tabs.query({ active: true })
          await chrome.scripting.executeScript({
            target: { tabId : tab.id },
            func : () => {
              let data = { info: document.documentElement.innerHTML}; 
              chrome.runtime.sendMessage(data);
            }
          })
          await chrome.runtime.sendMessage('getInfo', async function(response) {
             let htmltext = await response
             const question = await extractQuestion(htmltext)
             const options = await extractOptions(htmltext)
             let result = "No expliques nada solo dime el numero de la opcion correcta. Lee correctamente la pregunta y las opciones, es un examen y te voy a poner a prueba \n Pregunta: " + question
             options?.forEach((option, index) => {
              result = result + `\n Opción ${index + 1}: ${option}`;
              })
           //result = await Process(result)
            setResult(result)

          });   
    }
    catch{ err => 
                console.log(err)
    }
    setInputText('')
    setLoading(false)
  }
  return (
    <>
     <Header/>
     <div className="flex justify-center gap-4 pl-10 pr-10">
      <div className="grid gap-4 p-3">  
        <div className="flex justify-center">
          <Button className="btn-process rounded-full" 
            onClick={HandleOnClick} isLoading={isLoading}>Procesar</Button>
        </div>     
        <textarea className="text-area"
          id='response' readOnly type='text'
          value={result}/>
          <div className="flex justify-center">
            <Button className="btn-copy rounded-full" isDisabled={result===''}
              onClick={() => copy(result)}>Copiar</Button>
          </div>
      </div>    
    </div>  
    </>
  )
}

export default App
