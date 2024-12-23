import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

    // Declare a new state variable, which we'll call "count"
  const [tarefas, setTarefas] = useState([]);
   const [novatarefas, setNovaTarefas] = useState('');


var novosDados = ()=>{ return tarefas.filter((item)=>{
    return  item.title.includes(novatarefas)
    })  

}
console.log(novatarefas)

 async function tarefasApi(){
       var tarefasapi = await fetch("https://jsonplaceholder.typicode.com/todos")
       var novasTarefasapi =  await tarefasapi.json()
       return novasTarefasapi;
}


useEffect(()=>{
       tarefasApi()
       .then(resu=>setTarefas(resu))
       .catch(erro=>cosole.error(erro))
       .finally(()=>console.log('tudo ok'))
   }
  ,[])


useEffect(()=>{
if(novatarefas){
  setTarefas(novosDados)
}else{
  tarefasApi().then(resu=>setTarefas(resu))
}

},[novatarefas])

  return (
    <>
      <div>
        <h1>Lista de Postagens</h1>
      </div>
      <div className='posts'>
      <input type='text' onChange={(e)=>setNovaTarefas(e.target.value)} placeholder='Faça sua busca.'/>
      <span className='aviso'> {tarefas.length !== 0? null:'Não encontrado'}</span>
        <ul>
          {
            tarefas.map((item)=>{
                return (
                    <li key={item.id} className={item.completed?'concluido':null}>
                      {item.title}
                    </li>
                  )
            })
          }
      </ul>
      </div>
    </>
  )
}

export default App
