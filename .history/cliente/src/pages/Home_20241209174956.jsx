import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";


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
      });
   
    }catch{
      alert('Ocorreu um erro na aplicação')
    }
  };

  const exportarPDF = () =>{
    const doc = new jsPDF();
    const tabela = usuarios.map ( usuarios =>[
      usuario.id,
      usuario.nome,
      usuario.email

      doc.text("Lista de usuarios",10,10);
      doc.autoTable
    ]);
  }

  return (
    <div>
    <button onClick={()=> exportarPDF()}>Gerar PDF</button>
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={() => removerPessoa(usuario.id)}>X</button></td>
        </tr>
      )}
    </table>
    </div>
  );
}