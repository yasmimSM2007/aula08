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
        const resposta = await fetch("http://localhost:3000/esmaltes");
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
      await fetch('http://localhost:3000/esmaltes/'+id, {
        method: 'DELETE'
      });
   
    }catch{
      alert('Ocorreu um erro na aplicação')
    }
  };

  const exportarPDF = () =>{
    const doc = new jsPDF();
    const tabela = esmaltes.map ( esmalte =>[
      esmalte.id,
      esmalte.nome,
      esmalte.brand,
      esmalte.color,
      esmalte.type,
      esmalte.price,
      esmalte.collection,
      esmalte.volume
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
      {esmaltes.map((esmalte) =>
        <tr key={esmalte.id}>
          <td>{esmalte.nome}</td>
          <td>{esmalte.brand}</td>
          <td>{esmalte.color}</td>
          <td>{esmalte.type}</td>
          <td>{esmalte.price}</td>
          <td>{esmalte.collection}</td>
          <td>{esmalte.volume}</td>
          <td><button onClick={() => removerEsmalte(esmalte.id)}>
            <DeleteForever/>
          </button>
          <Link to={'/alterar/' + esmalte.id}>
          <button>Alterar</button>
          </Link>
          </td>
        </tr>
      )}
    </table>
    </div>
  );
}