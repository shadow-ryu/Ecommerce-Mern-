import React,{useState} from 'react'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import logo from "./logo.png"
import './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const userData = {
        name: 'ryu'
    }
    const [user, setUser] = useState(null);
    const [click, setClick] = useState(false);
    const menutoggle=()=> {

      setClick(!click);
    }
    return (
        // <img classNamr="navbar__logo" src={logo} alt="" />
        <div className="navbar" >
      <Link to="/">
       <img className="navbar__logo" src={logo} alt="" height="50" />
      </Link>

      <div className="navbar__search">
        <input className="navbar__searchInput" type="text" />
        <SearchIcon className="navbar__searchIcon" />
      </div>

      <div className={click ?" mini_navbar__nav ":"navbar__nav"}>

            <Link to={!user && '/login'} className="navbar__hidden">
                <div onClick className="navbar__option">
                
                   <span className="navbar__optionLineOne">Hello {!user ? 'Guest' : user.name}</span>
                  <span className="navbar__optionLineTwo">{user ? 'Log Out' : 'Sign In'}</span>

              
                 
                </div>
              </Link>
              <Link to='/orders' className="navbar__hidden">
                <div onClick className="navbar__option">
                
                 
            
                <span className="navbar__optionLineOne">Returns</span>
                  <span className="navbar__optionLineTwo">{!user ? 'Order' : "My Order"}</span>
              
                 
                </div>
              </Link>
            

              {click?
                  <>
                     <Link to='/profile'>
                    <div className="navbar__option">
                    <span className="navbar__optionLineTwo">{!user ? 'Profile' : "My Profile"}</span>
                    </div>
                   </Link>
                  </> :
                  <>
                
                  </>

                  }
                     {click?
                  <>
                    <Link to='/orders'>
                <div className="navbar__option " >
                   <span className="navbar__optionLineOne">Returns</span>
                  <span className="navbar__optionLineTwo">{!user ? 'Order' : "My Order"}</span>
                </div>
              </Link>
                  </> :
                  <>
                
                  </>

                  }
              
      </div>
      <Link to="/checkout">
                <div className="navbar__optionBasket">
                  <ShoppingBasketIcon />
                  <span className="navbar__optionLineTwo navbar__basketCount">
                   1
                  </span>
                </div>
        </Link>
         <div className="navbar__miniScreen">
           <div className="togl" onClick={menutoggle}>
           {click ?  <CloseIcon/>  :<MenuIcon/>}
         
           </div>
 
          
           
         </div>
    </div>
    ) 
}

export default Navbar
