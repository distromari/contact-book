import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ImArrowLeft2 } from 'react-icons/im';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header";
import InputMask from 'react-input-mask';

function FormContact() {

  const {register, handleSubmit, setValue, setFocus, formState:{errors}} = useForm();

  // Função onSubmit

  const onSubmit = (event) => {
    //Funcao que acontece no envio do Formulario
    var array = JSON.parse(localStorage.getItem('contatos') || '[]');
    event = {
      ...event,
      phoneList,
    }
    //Adiciona ao array o objeto event que foi preenchido no formulario e adiciona isso localmente no localStorage
    array.push(event);
    localStorage.setItem("contatos", JSON.stringify(array));
    console.log(event);
    toast.success("Contato adicionado com sucesso!");
    //Atualiza pagina para limpar os dados do formulario.
    window.location.reload(false);
  }

  //Consumindo API para pegar dados de endereço, utiliza api VIACEP pois nao precisa de autenticação
  const checkCep = (e, event) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    if (cep !== "") {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json()).then(data => {
        //Seta os valores do formulario com os dados do cep
        setValue('street', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
        setFocus('number');
      });
    }
  }

  // State telefone, cria um array para armanezar os telefones
  const [ phoneList, setPhoneList ] = useState ([
    { phone: ""}
  ]);

  // Função para adicionar mais um telefone
  const handleAddPhone = () => {
    setPhoneList([...phoneList, {phone: ""}])
  }

  // Função para remover um telefone
  const handleRemovePhone = (indexPhone) => {
    const list = [...phoneList];
    list.splice(indexPhone, 1);
    setPhoneList(list);
  }

  // Função para atualizar o array de telefone
  const handlePhoneChange = (e, indexPhone) => {
    const { name, value } = e.target;
    const list = [...phoneList];
    list[indexPhone][name] = value;
    setPhoneList(list);
  }

  // State endereço
  const [ addressList, setAddressList ] = useState ([ {
    zip: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    number: ""
  } ]);

  // Função para adicionar mais um endereço
  const handleAddAddress = () => {
    setAddressList([...addressList, {
      zip: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      number: ""
  }])
  }

  // Função para remover um endereço
  const handleRemoveAddress = (indexAddress) => {
    const list = [...addressList];
    list.splice(indexAddress, 1);
    setAddressList(list);
  }

  // const handleAddressChange = (e, indexAddress) => {
  //   const { name, value } = e.target;
  //   const list = [...addressList];
  //   list[indexAddress][name] = value;
  //   setAddressList(list);
  // }

  return (
    <div className="flex flex-col">
      <div className=" sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* Formulário */}
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md" component="form">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {/* Nome */}
                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="name-contact" className="block text-sm font-medium text-gray-700">
                        Nome
                      </label>
                      <input
                        name="name"
                        {...register('name', { required: true, maxLength: 200 })}
                        type="text"
                        id="name-contact"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Nome do contato"
                      />
                      {/* Div para mostrar a validação do campo, foi adicionado em outros campos essa validação. */}
                      <div className="text-red-500">
                        {errors.name && errors.name.type === "required" && <span>Preencha este campo.</span>}
                        {errors.name && errors.name.type === "maxLength" && <span>O tamanho máximo é 200 caracteres.</span> }
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 mb-3 items-center sm:grid-cols-2">
                    {/* Telefone */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Telefone
                      </label>
                      <>
                        <div className="gap-4 mb-2 items-center">
                          {phoneList.map((singlePhone, index) => (
                          <div key={index} className="grid grid-cols-1">
                            <div className="first-division flex items-center">
                              {/* Adicionado componente para utilização da mascara no campo de telefone */}
                              <InputMask
                                name="phone"
                                type="tel"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="(11)11111-1111"
                                id="phone"
                                mask='(11)99999-9999'
                                value={singlePhone.phone}
                                onChange={(e) => handlePhoneChange(e, index)}>
                              </InputMask>
                              {phoneList.length - 1 === index && phoneList.length < 4 && (
                              <div className="">
                                <AiOutlinePlusCircle size={25} className="cursor-pointer" onClick={handleAddPhone} />
                              </div>
                              )}
                              {phoneList.length !== 1 && (
                                <div>
                                  <MdRemoveCircleOutline size={25} className="cursor-pointer"
                                  onClick={() => handleRemovePhone(index)} />
                                </div>
                              )}
                            </div>
                            <div className="text-red-500">
                              {errors.phone && errors.phone.type === "required" && <span>Preencha este campo.</span>}
                            </div>
                          </div>
                          ))}
                      </div>
                        </>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {/* E-mail */}
                    <div className="col-span-2 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        E-mail
                      </label>
                      <input
                        name="email"
                        {...register('email', { required: true })}
                        type="email"
                        id="email-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="emailcontato@gmail.com"
                      />
                      <div className="text-red-500">
                        {errors.email && errors.email.type === "required" && <span>Preencha este campo.</span>}
                      </div>
                    </div>
                    {/* Cargo */}
                    <div className="col-span-2 sm:col-span-2">
                      <label htmlFor="name-contact" className="block text-sm font-medium text-gray-700">
                        Cargo
                      </label>
                      <div className="mb-3 xl:w-96">
                        <select className="
                          mt-1
                          form-select appearance-none
                          block
                          w-full
                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding bg-no-repeat
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          {...register('role')}
                        >
                          <option defaultValue>Nenhum cargo</option>
                          <option value="Administrador">Administrador</option>
                          <option value="Membro">Membro</option>
                          <option value="Visitante">Visitante</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Endereço */}
                  {addressList.map((singleAddress, indexAddress) => (
                    <div key={indexAddress}>
                      <div className="flex mt-8 mb-3">
                        <h1 className="text-1xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Endereço</h1>
                        {addressList.length - 1 === indexAddress && addressList.length < 4 && (
                        <div className="">
                          <AiOutlinePlusCircle size={25} className="cursor-pointer" onClick={handleAddAddress} />
                        </div>
                        )}
                        {addressList.length !== 1 && (
                        <div>
                          <MdRemoveCircleOutline size={25} className="cursor-pointer"
                          onClick={() => handleRemoveAddress(indexAddress)} />
                        </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                        {/* CEP */}
                        <div className="col-span-2 sm:col-span-3">
                          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            CEP *
                          </label>
                          <input
                            name="zip"
                            onBlur={checkCep}
                            type="text"
                            id="postal-code"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="CEP do endereço"
                            // {...register('zip', { required: true })}
                          />
                          <div className="text-red-500">
                            {errors.zip && errors.zip.type === "required" && <span>Preencha este campo.</span>}
                          </div>
                        </div>

                        {/* Cidade */}
                        <div className="col-span-6">
                          <label htmlFor="city-name" className="block text-sm font-medium text-gray-700">
                            Cidade
                          </label>
                          <input
                            name="city"
                            {...register('city')}
                            id="city-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Cidade"
                            {...register('city', { required: true })}
                          />
                          <div className="text-red-500">
                            {errors.city && errors.city.type === "required" && <span>Preencha este campo.</span>}
                          </div>
                        </div>

                        {/* Estado */}
                        <div className="col-span-6">
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                            Estado
                          </label>
                          <input
                            name="state"
                            {...register('state')}
                            id="state"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Estado"
                            {...register('state', { required: true })}
                          />
                          <div className="text-red-500">
                            {errors.state && errors.state.type === "required" && <span>Preencha este campo.</span>}
                          </div>
                        </div>

                        {/* Rua */}
                        <div className="col-span-6">
                          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                            Rua
                          </label>
                          <input
                            name="street"
                            {...register('street')}
                            type="text"
                            id="street-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Rua"
                            {...register('street', { required: true })}
                          />
                          <div className="text-red-500">
                            {errors.street && errors.street.type === "required" && <span>Preencha este campo.</span>}
                          </div>
                        </div>

                        {/* Bairro */}
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label htmlFor="neighborhood-address" className="block text-sm font-medium text-gray-700">
                            Bairro
                          </label>
                          <input
                            name="neighborhood"
                            {...register('neighborhood')}
                            type="text"
                            id="neighborhood-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Bairro"
                            {...register('neighborhood', { required: true })}
                          />
                          <div className="text-red-500">
                            {errors.neighborhood && errors.neighborhood.type === "required" && <span>Preencha este campo.</span>}
                          </div>
                        </div>

                        {/* Número */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label htmlFor="number-address" className="block text-sm font-medium text-gray-700">
                            Número
                          </label>
                          <input
                            name="number"
                            type="number"
                            id="number-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="N°"
                            {...register('number', { required: true })}
                          />
                          <div className="text-red-500">
                            {errors.number && errors.number.type === "required" && <span>Preencha este campo.</span>}
                          </div>
                        </div>

                        {/* Complemento */}
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                            Complemento
                          </label>
                          <input
                            type="text"
                            name="complement"
                            id="complement"
                            autoComplete="address-level1"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={singleAddress.complement}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Salvar contato
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewContact() {
  return (
    <>
      <Header />
      <Container className="mt-5">
        {/* Botão voltar */}
        <Link to="/">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ImArrowLeft2 size={25} className="mr-3" />
            Voltar
          </button>
        </Link>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-8">Adicione um novo contato</h1>
        <FormContact />
      </Container>
    </>
  )
};