//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { ReactNode, useRef } from "react";
import { useCurrentPageContext, PageName } from "../context/CurrentPageContextProvider";
import { Link } from "react-router-dom";

function styleOfLi(currentPage: PageName, pageName: PageName) {
  return `list-group-item ${currentPage == pageName ? "active" : ""}`;
}

type Props = {
  type: PageName;
  to: string;
  children: ReactNode;
};

const MyNavLink = ({
  type,
  to,
  children
}: Props) => {
  const {
    currentPage,
    setCurrentPage
  } = useCurrentPageContext();
  const linkRef = useRef<any>();
  return (
    <li className={styleOfLi(currentPage, type)} onClick={() => linkRef.current.click()}>
      <Link to={to} ref={linkRef} onClick={() => setCurrentPage(type)}>{children}</Link>
    </li>
  );
};

export default MyNavLink;