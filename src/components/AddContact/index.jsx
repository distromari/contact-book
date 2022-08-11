import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { BsPersonPlusFill } from 'react-icons/bs';

const AddContact = () => {
  return (
    <Container className="flex items-center justify-between mt-5">
      <div className="flex min-w-0">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Lista de contatos
        </h1>
      </div>
      <div className="flex lg:mt-0 lg:ml-4 gap-3">
        <span className="sm:ml-3">
        <Link to="/novo-contato">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Novo contato
            <BsPersonPlusFill size={25} className="ml-3" />
          </button>
        </Link>
        </span>
      </div>
    </Container>
  )
}

export default AddContact;