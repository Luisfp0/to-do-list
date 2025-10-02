import {useState, useEffect} from "react";
import './TodoList.css'
import Icone from'./assets/public/icon.webp';

function TodoList() {
  const listaStorage = localStorage.getItem('Lista')

  const[lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : [])
  const[novoItem, setNovoItem] = useState('')

  useEffect(()=> {
    localStorage.setItem('Lista', JSON.stringify(lista));
  },[lista])

  function adicionaItem(form) {
  const dateObject = new Date();

  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const monthName = dateObject.toLocaleString('pt-BR', { month: 'long' });
  const year = dateObject.getFullYear();
  const hour = dateObject.getHours();
  const minutes = dateObject.getMinutes();

    form.preventDefault()
    if(!novoItem) {
      return
    }
    setLista([...lista, {text: novoItem, isCompleted: false, date: {day, monthName, monthIndex, year, hour, minutes}}])
    setNovoItem('')
    document.getElementById('input-entrada').focus()
  }

  function clicou(index) {
    const listaAux = [...lista]
    listaAux[index].isCompleted = !listaAux[index].isCompleted
    setLista(listaAux)
  }

  function deleta(index) {
    const listaAux = [...lista]
    listaAux.splice(index, 1)
    setLista(listaAux)
  }

  function deletaTudo() {
    setLista([])
  }

  return (
    <div>
      <h1>O que fez nos dias, dailys</h1>
      <form onSubmit={adicionaItem}>
        <input 
          id="input-entrada"
          value={novoItem} 
          onChange={(e)=>{setNovoItem(e.target.value)}}
          type="text" 
          placeholder="Adicione uma tarefa"
          />
        <button className='add' type="submit">Add</button>
      </form> 
      <div className="listaTarefas">
        <div style={{textAlign:'center'}}>
        {
          lista.length < 1
          ?
          <img className="icone-central" src={Icone}/>
          :
          lista.map((item, index)=>(
            <div key={index} className={item.isCompleted ? 'item completo' : 'item'}>
              <span className="teste" onClick={()=>{clicou(index)}}>{item.text}</span>
              <div >
                <span onClick={()=>{clicou(index)}}>{item.date.day}/</span>
                <span onClick={()=>{clicou(index)}}>{item.date.monthIndex}/</span>
                <span onClick={()=>{clicou(index)}}>{item.date.year}</span>
                <span onClick={()=>{clicou(index)}}> - </span>
                <span onClick={()=>{clicou(index)}}>{item.date.hour}:</span>
                <span onClick={()=>{clicou(index)}}>{item.date.minutes}</span>
              </div>
              <div className="item">
                <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
              </div>
            </div>
          ))
        } 
        {
          lista.length > 0 && 
          <button onClick={()=>{deletaTudo()}} className="deletAll">Deletar Todas</button>
        }
        </div>
      </div>
    </div>
  )
}

export default TodoList