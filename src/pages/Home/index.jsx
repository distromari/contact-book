import React from 'react'
import Header from "../../components/Header"
import AddContact from "../../components/AddContact"
import Table, { SelectColumnFilter } from "../../components/Table"

const getData = () => {
  // Dados
  const data = [];
  //Criado para que possa ser acessado de qualquer local
  var phone = "";
  //Busca os dados salvo no localStorage e adiciona na tabela, caso nao tenha o array permanece vazio
  const arrayContatos = JSON.parse(localStorage.getItem('contatos') || '[]');
  for (let i = 0; i < arrayContatos.length; i++) {
    data.push(arrayContatos[i]);
    //para fim de testes, adiciona o primeiro telefone inserido na posicao 0 do objeto para ser mostrado na tabela.
    phone = arrayContatos[i].phoneList[0].phone;
    arrayContatos[i].principalPhone = phone;
    //
  }
  return [...data]
}

export function Home() {
    // Colunas da tabela
    const columns = React.useMemo(() => [
    {
      Header: "Nome",
      accessor: 'name',
    },
    {
      Header: "Telefone",
      accessor: 'principalPhone',
    },
    {
      Header: "E-mail",
      accessor: 'email',
    },
    {
      Header: "Cidade",
      accessor: 'city',
    },
    {
      Header: "Estado",
      accessor: 'state',
    },
    {
      Header: "Cargo",
      accessor: 'role',
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
  ], [])

  const data = React.useMemo(() => getData(), [])
  return (
    <>
      <Header />
      <AddContact />
      <Table columns={columns} data={data} />
    </>
  )
};