import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {Link} from "react-router-dom"
import { Button } from "@mui/material";
import DeleteForever from '@mui/icons-material/DeleteForever'

export default function Home() {
  const [esmaltes, setEsmaltes] = useState([]);

  useEffect(() => {
    const buscarEsmaltes = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/esmaltes");
        const dados = await resposta.json();
        setEsmaltes(dados);
      } catch {
        alert('Erro ao buscar esmalte');
      }
    }
    buscarEsmaltes();
  }, [esmaltes]);

  const removerEsmaltes = async (id) => {
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
    const tabela = esmaltes.map ( esmaltes =>[
      esmalte.id,
      esmalte.name,
      esmalte.brand,
      esmalte.color,
      esmalte.type,
      esmalte.stock,
      esmalte.price,
    ]);
    doc.text("Lista de Esmaltes", 10, 10);
    doc.autoTable({
      head: [["ID", "Nome", "Marca", "Cor", "Tipo", "Preço", "Estoque"]],
      body: tabela,
    });
     doc.save("esmaltes.pdf");
  }

  return (
    <div>
    <table>
    <Button variant = "contained" onClick={()=> exportarPDF()}>Gerar PDF</Button>
    <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Cor</th>
            <th>Tipo</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {esmaltes.map((esmalte) => (
            <tr key={esmalte.id}>
              <td>{esmalte.name}</td>
              <td>{esmalte.brand}</td>
              <td>{esmalte.color}</td>
              <td>{esmalte.type}</td>
              <td>R$ {esmalte.price.toFixed(2)}</td>
              <td>{esmalte.stock}</td>
              <td>
                <button onClick={() => removerEsmalte(esmalte.id)}>
                  <DeleteForever />
                </button>
                <Link to={'/alterar/' + usuario.id}>
          <button>Alterar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





