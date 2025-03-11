import './Header.modules.css';
import { FaGithub, FaLinkedin  } from "react-icons/fa";


function Header (){
    return(
        <>
        <header id='header'>
            <h1><a href="#">VS AnimeList</a></h1>
            <nav>
                <ul>
                    <li><a href="#"><FaGithub className='headerIcon'/></a></li>
                    <li><a href='#'><FaLinkedin className='headerIcon'/></a></li>
                    <li><a href='#'>See my portfolio</a></li>
                </ul>
            </nav>
        </header>
        </>
    );
}

export default Header;