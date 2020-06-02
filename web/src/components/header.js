<<<<<<< HEAD
import {Link} from "gatsby";
import React from "react";
import Icon from "./icon";
import {cn} from "../lib/helpers";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import "../assets/css/header_nav.css";
import styles from "./header.module.css";

const Header = ({onHideNav, onShowNav, showNav, siteTitle, data}) => (
    <div className={styles.root}>
        <div className={styles.wrapper}>


            <button
                className={styles.toggleNavButton}
                onClick={showNav
                ? onHideNav
                : onShowNav}>
                <Icon symbol="hamburger"/>
            </button>

            <nav className={cn(styles.nav, showNav && styles.showNav)}>
                <ul>

                    {data
                        .navItems
                        .map(nav => {
                            if (nav.navL2.length == 0) {
                                return (

                                    <li>
                                        <Link to="/home/">{nav.navL1.name}.</Link>
                                    </li>

                                )
                            } else {
                                return (
                                    <div>
                                        <li className="listed_nav_header">
                                            <Link to="/home/">{nav.navL1.name}.
                                            </Link>
                                            <div className="listed_nav">

                                                {nav
                                                    .navL2
                                                    .map(navi => {
                                                        return (
                                                            <Link to="/home/">{navi.name}</Link>

                                                        )

                                                    })}

                                            </div>
                                        </li>
                                    </div>
                                )
                            }

                        })}
                </ul>
            </nav>

        </div>
    </div>
=======
import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn } from "../lib/helpers";

import styles from "./header.module.css";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>
        <Link to="/">{siteTitle}</Link>
      </div>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <Link to="/archive/">Old Stuff</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
>>>>>>> c4051dd440968ae4407044379d04672487802a47
);

export default Header;
