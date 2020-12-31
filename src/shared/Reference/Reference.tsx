import React from "react";
import "./Reference.scss";
import { Link } from "react-router-dom";

interface ILink {
  children: string;
  to?: string;
  styles?: string;
}

const Reference = (props: ILink) => {
  const { children, to, styles } = props;
  return (
    <Link to={to ? to : "/"} className={styles ? `link ${styles}` : "link"}>
      {children}
    </Link>
  );
};

export default Reference;
