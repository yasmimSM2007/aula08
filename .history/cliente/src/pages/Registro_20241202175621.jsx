import  { useState } from 'react';
import {useNavigation} from 'react-router-dom'

export default function Registrar(){

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation

  const registrarPessoa = async(event) => {
    event.preventDefault();
    try{
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method : 'POST',
        headers: {'Content-type':'Application/json'}
        body: JSON.stringify({
       nome:nome
       email: email   
        })
      });
    }catch{
      alert('Ocorreu um erro na aplicação')
    }
 }

  return (
    <main>
      <form onSubmit={registrarPessoa}>
          <input type="text" name="" id="" value={nome} 
          onChange={(event) => setNome(event.target.value)}/>
          <input type="email" name="" id="" value={email} 
          onChange={(event) => setEmail(event.target.value)}/>
       <button>Salvar</button>
       </form>
       </main>
  );
}