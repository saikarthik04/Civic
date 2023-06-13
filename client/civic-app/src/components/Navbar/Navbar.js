import './Navbar.css';

function Navbar() {
    return(
        <div className="Navbar">
            <div>
                logo
            </div>
            <div>
                <ul className="menu">
                    <li><a>profile</a></li> 
                    <li><a>become a seller</a></li> 
                </ul>
            </div>
        </div>
    );
}

export default Navbar;