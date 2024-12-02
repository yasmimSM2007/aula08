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
      <h1>Registro de Usuário</h1>
      <form onSubmit="">
          <input type="text" name="" id="nome" value={nome} 
          onChange={(event) => setNome(e.target.value)}
          />
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </main>
  );
};

export default Registro;
