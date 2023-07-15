import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/navBar/NavBar";
import { useNavigate } from "react-router-dom";
import { getAllVendas } from "../../services/postsServices";
import { sessionStatusAdmin } from "../../contexts/AuthContext";
import { Tabela } from "../estoque/EstoqueStyled";
import { CardVenda } from "../../Card/Card";

export default function Venda() {
    const navigate = useNavigate();
    const [vendas, setVendas] = useState([]);

    const [selectedVenda, setSelectedVenda] = useState(null);
    const [openPedidosModal, setOpenPedidosModal] = useState(false);

    async function findAllVendas() {
        const response = await getAllVendas();
        setVendas(response.data);
    }

    useEffect(() => {
        sessionStatusAdmin(navigate)
        .then(() => findAllVendas());
    }, []);

    return (
        <>
            <NavBar />

            <Tabela>
                <table>
                    <caption>
                        <h3>Lista de Vendas</h3>
                    </caption>
                    <thead>
                        <tr>
                            <th>Preço</th>
                            <th>Pagamento</th>
                            <th>Entrega</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.map((venda) => (
                            <CardVenda
                                key={venda._id}
                                venda={venda}
                            />
                        ))}
                    </tbody>
                </table>
            </Tabela>
        </>
    );
}
