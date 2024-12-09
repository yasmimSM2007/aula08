import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";


export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios]);

  const removerPessoa = async (id) => {
    try{
      await fetch('http://localhost:3000/usuarios/'+id, {
        method: 'DELETE'
      })
    }
    catch{
      alert('Ocorreu um erro na aplicação')
    }
  }

  return (
    <table>
      <tr>
        <td>Nome</td>
        <…
registro
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigate()

  const registrarPessoa = async(event) => {
    event.preventDefault();
  try{
    const resposta = await fetch('http://localhost:3000/usuarios', {
      method : 'POST',
      headers: {'Content-type':'Application/json'},
      body: JSON.stringify({
      nome:nome,
      email: email   
      })
    });
    if(resposta.ok){
      navigation('/');
    }
  }
  catch{
    alert('Ocorreu um erro no app!')
  }
  }


  return (
    <main>
    <form onSubmit={registrarPessoa}>
        <input type="text" name="" id="nome" value={nome} 
        onChange={(event) => setNome(event.target.value)} />
        <input type="email" id="email" value={email}
        onChange={(event) => setEmail(event.target.value)} />
      <button type="submit">Salvar</button>
    </form>
  </main>
  );
};