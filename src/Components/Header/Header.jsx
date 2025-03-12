import './Header.modules.css';
import { FaGithub, FaLinkedin  } from "react-icons/fa";


function Header (){
    return(
        <>
        <header id='header'>
            <h1><a href="#">VS AnimeList</a></h1>
            <nav>
                <ul>
                    <li><a href="https://github.com/SaltybeeVS"><FaGithub className='headerIcon'/></a></li>
                    <li><a href='https://www.linkedin.com/in/vicente-sandoval-carrasco/'><FaLinkedin className='headerIcon'/></a></li>
                    <li><a href='https://saltybeevs.github.io/Portfolio/'>See my portfolio</a></li>
                </ul>
            </nav>
        </header>
        </>
    );
}

export default Header;