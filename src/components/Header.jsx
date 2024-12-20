import { FaQuestionCircle } from 'react-icons/fa';

function Header() {
  return (
    <header className="ml-5 mr-2 flex items-center justify-between p-4 bg-gray-800">
      <span className="text-white text-lg">Design Studio</span>
      <button className="bg-transparent text-white border-white px-4 py-2 rounded flex items-center">
        <FaQuestionCircle className="mr-2" /> Help
      </button>
    </header>
  );
}

export default Header;
