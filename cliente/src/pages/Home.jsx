import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";

export default function Home() {
  const [esmaltes, setEsmaltes] = useState([]);

  useEffect(() => {
    const buscarEsmalte = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/esmaltes");
        const dados = await resposta.json();
        setEsmaltes(dados);
      } catch {
        alert("Ocorreu um erro no app!");
      }
    };
    buscarEsmalte();
  }, [esmaltes]);

  const removerEsmalte = async (id) => {
    try {
      await fetch("http://localhost:3000/esmaltes/" + id, {
        method: "DELETE",
      });
    } catch {
      alert("Ocorreu um erro na aplicação");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = esmaltes.map((esmaltes) => [
      esmaltes.id,
      esmaltes.nome,
      esmaltes.brand,
      esmaltes.color,
      esmaltes.type,
      esmaltes.price,
      esmaltes.collection,
      esmaltes.volume,
    ]);
    doc.text("Lista de esmaltes", 10, 10);
    doc.autoTable({
      head: [
        ["ID", "Nome", "Brand", "Color", "Type", "Price", "Collection", "Volume"],
      ],
      body: tabela,
    });
    doc.save("esmaltes.pdf");
  };

  return (
    <div>
      <Button variant="contained" onClick={() => exportarPDF()}>
        Gerar PDF
      </Button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Type</th>
            <th>Price</th>
            <th>Collection</th>
            <th>Volume</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {esmaltes.map((esmalte) => (
            <tr key={esmalte.id}>
              <td>{esmalte.nome}</td>
              <td>{esmalte.brand}</td>
              <td>{esmalte.color}</td>
              <td>{esmalte.type}</td>
              <td>{esmalte.price}</td>
              <td>{esmalte.collection}</td>
              <td>{esmalte.volume}</td>
              <td>
                <button onClick={() => removerEsmalte(esmalte.id)}>
                  <DeleteForever />
                </button>
                <Link to={"/alterar/" + esmalte.id}>
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
