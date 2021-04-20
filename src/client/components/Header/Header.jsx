import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Header.scss';

function Header() {
  return (
    <div className={classes.headerContainer}>
      <NavLink
        className={classes.navLink}
        activeClassName={classes.navLinkActive}
        to="/color-pie"
      >Color Pie</NavLink>
      <NavLink
        className={classes.navLink}
        activeClassName={classes.navLinkActive}
        to="/bar-chart"
      >Bar Chart</NavLink>
      <NavLink
        className={classes.navLink}
        activeClassName={classes.navLinkActive}
        to="/scatterplot"
      >Scatterplot</NavLink>
      <NavLink
        className={classes.navLink}
        activeClassName={classes.navLinkActive}
        to="/line-chart"
      >Line Chart</NavLink>
      <NavLink
        className={classes.navLink}
        activeClassName={classes.navLinkActive}
        to="/world-map"
      >World Map</NavLink>
      <NavLink
        className={classes.navLink}
        activeClassName={classes.navLinkActive}
        to="/menu-page"
      >Menu page</NavLink>
      <NavLink
        className={classes.navLink}
        activeClassName={classes.navLinkActive}
        to="/missing-migrants"
      >Missing Migrants</NavLink>
    </div>
  );
}

export {Header};
