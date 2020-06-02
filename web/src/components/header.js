import {Link} from "gatsby";
import React from "react";
import Icon from "./icon";
import {cn} from "../lib/helpers";
import "../assets/css/header_nav.css";
import styles from "./header.module.css";

const Header = ({onHideNav, onShowNav, showNav, siteTitle, data}) => (
    <div className={styles.root}>
        <div className={styles.wrapper}>


            <button
            name="Menu_icon"
            aria-label="Menu Icon"
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
);

export default Header;
