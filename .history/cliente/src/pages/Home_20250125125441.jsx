import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {Link} from "react-router-dom"
import { Button } from "@mui/material";
import DeleteForever from '@mui/icons-material/DeleteForever'

export default function Home() {

  const [esmaltes, setEsmaltes] = useState([]);

  useEffect(() => {
    const buscarEsmalte = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setEsmaltes(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarEsmalte();
  }, [esmaltes]);

  const removerEsmalte = async (id) => {
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
    const tabela = esmaltes.map ( esmaltes =>[
      esmaltes.id,
      esmaltes.nome,
      esmaltes.brand,
      esmaltes.color,
      esmaltes.type,
      esmaltes.price,
      esmaltes.collection,
      esmaltes.volume
    ]);
    doc.text("Lista de esmaltes",10,10);
    doc.autoTable ({
      head: [[ "ID","Nome","Brand","Color","Type","Price","Collection","Volume" ]],
      body: tabela
  });
     doc.save("esmaltes.pdf");
  }

  return (
    <div>
    <table>
    <Button variant = "contained" onClick={()=> exportarPDF()}>Gerar PDF</Button>
      <tr>
        <td>Nome</td>
        <td>Brand</td>
        <td>Color</td>
        <td>Type</td>
        <td>Price</td>
        <td>Collection</td>
        <td>Volume</td>
      </tr>
      {esmaltes.map((esmaltes) =>
        <tr key={esmaltes.id}>
          <td>{esmaltes.nome}</td>
          <td>{esmaltes.brand}</td>
          <td>{esmaltes.color}</td>
          <td>{esmaltes.type}</td>
          <td>{esmaltes.price}</td>
          <td>{esmaltes.collection}</td>
          <td>{esmaltes.volume}</td>
          <td><button onClick={() => removerEsmalte(esmaltes.id)}>
            <DeleteForever/>
          </button>
          <Link to={'/alterar/' + esmaltes.id}>
          <button>Alterar</button>
          </Link>
          </td>
        </tr>
      )}
    </table>
    </div>
  );
}