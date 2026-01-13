import { Link  } from "react-router-dom"
import Logo from '../../assets/logo BLUEWAVE-2.png';

export const HeaderAuth = () => {

    return (
        <>
            <header className="flex justify-center items-center h-20 bg-[#001F3F]">
                <div className='logo transition-transform duration-300 hover:scale-105'>
                    <Link to="/" className='no-underline'>
                        <img
                            src={Logo}
                            alt="Logo"
                            className="h-8 xs:h-9 sm:h-10 object-contain"
                        />
                    </Link>
                </div>
            </header>
        </>
    );
};
