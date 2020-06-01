import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn } from "../lib/helpers";

import "../assets/css/header_nav.css";
import styles from "./header.module.css";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle , data }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>

      </div>
{console.log(data)}
      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <Link to="/archive/">Old Stuff</Link>

          </li>
          <li><Link to="/home/">Home</Link></li>
          <li><Link to="/how_to/">Article</Link></li>
          {data.navItems.map(nav =>{
           if(nav.navL2.length == 0){
            return(

              <li><Link to="/home/">{nav.navL1.name}</Link></li>

            )
           }else{
             return(
              <li className="listed_nav_header"><Link to="/home/">{nav.navL1.name}</Link>
<ul className="listed_nav">
{nav.navL2.map(navi=>{
  return(
    <li ><Link to="/home/">{navi.name}</Link></li>

  )

})}

</ul>
</li>
             )
           }


          })}
        </ul>
      </nav>

    </div>
  </div>
);

export default Header;
