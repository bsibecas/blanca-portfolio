// components/Footer.js
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-24 border-t mt-8">
      <div className="flex space-x-4 mt-4">
        <a
          href="https://github.com/bsibecas"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-skyCustom"
        >
          <AiFillGithub className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/blancasibecas/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-skyCustom"
        >
          <AiFillLinkedin className="w-6 h-6" />
        </a>
      </div>
      <p className="text-center mt-4 font-light text-sm">
        © {new Date().getFullYear()} Blanca Sibecas Hernández. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
