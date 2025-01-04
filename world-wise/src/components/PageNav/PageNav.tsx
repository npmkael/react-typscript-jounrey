import { NavLink } from "react-router-dom";

/**
 * Documentation for <Link /> and <NavLink /> components from react-router-dom.
 */

// 1. <Link />
/**
 * The <Link /> component creates navigational links within a React Router application.
 * It enables smooth, client-side navigation without reloading the page.
 */

// Props for <Link />
/**
 * @prop {string | object} to        - Specifies the target route path.
 * @prop {boolean}        replace   - (Optional) If true, replaces the current history entry.
 * @prop {object}         state     - (Optional) State to pass with the navigation.
 */

// 2. <NavLink />
/**
 * The <NavLink /> component is a specialized version of <Link /> with active state styling.
 * It is used to indicate which route is currently active.
 */

const PageNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
