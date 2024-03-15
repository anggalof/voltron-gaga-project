import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.css';

interface ProfileProps {
  size: string;
}

const Profile: React.FC<ProfileProps> = ({ size }) => {
  return (
    <>
      <img src="/images/gaga-adi.jpeg" className="rounded-[50%] md:w-[2rem] md:h-[2rem] w-[3rem] h-[3.2rem] border-2 border-[#fff]" alt="user-profile" />
      <span className={`text-[#FFFFFF] pl-2 text-sm ${size === 'desktop' ? 'hidden md:block' : 'block'}`}>Gaga Adi Lesmana Putra</span>
    </>
  );
};

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const open = isOpen ? styles.overlay : '';

  return (
    <>
      <nav className="px-0 :px-10 :py-auto">
        <div className="flex p-4 md:p-6">
          <div className="cursor-pointer" onClick={() => router.back()}>
            <img src="/images/logo-voltron.webp" alt="logo" className=" w-40" />
          </div>
          <div className="ml-auto hidden md:flex md:items-center">
            <Profile size="dekstop" />
          </div>
          <button className="ml-auto md:hidden p-2 text-white" onClick={toggleSidebar}>
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3zm0 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3zm0 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3z"/>
            </svg>
          </button>
        </div>
      </nav>
      <div className={`border-r border-[#C2CFD6] p-0 md:p-6 md:hidden ${isOpen ? 'md:block' : 'hidden md:block'}`}>
        <div className={open} onClick={handleCloseModal}>
          <div className="bg-[#04524E] z-[9999] h-full fixed right-0 top-0 overflow-y-auto">
            <header className="py-10 pl-4 pr-6">
              <div className="ml-auto flex items-center">
                <Profile size="mobile" />
              </div>
            </header>
          </div>
        </div>
      </div>
    </>
  )
}
