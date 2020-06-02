import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import Collapse from '@material-ui/core/Collapse';
import { cn } from "../lib/helpers";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import "../assets/css/header_nav.css";
import styles from "./header.module.css";

const Header_backup = ({ onHideNav, onShowNav, showNav, siteTitle , data }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>

      </div>
{console.log(data)}
      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button>

     <List >


          {data.navItems.map(nav =>{
           if(nav.navL2.length == 0){
            return(
              <ListItem button>

              <Link to="/home/">   <ListItemText primary={nav.navL1.name} /> </Link>
            </ListItem>


            )
           }else{
            const [open, setOpen] = React.useState(false);

            const handleClick = () => {
              setOpen(!open);
            };
             return(
<div>
              <ListItem button onClick={handleClick}>

              <ListItemText primary={nav.navL1.name} />
              {open ? "<" : ">"}
            </ListItem>


            <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

{nav.navL2.map(navi=>{
  return(

   <ListItem button>

   <Link to="/home/"> <ListItemText primary={navi.name} /></Link>
   </ListItem>
  )

})}

</List>
</Collapse>

</div>
             )
           }


          })}

        </List>

    </div>
  </div>
);

export default Header_backup;
