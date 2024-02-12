//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { useEffect } from 'react';
import { useCurrentPageContext } from '../context/CurrentPageContextProvider';
import MyAccardion from './MyAccardion';
import MyAccardionItem from './MyAccardionItem';

const AuthorPage = () => {
  const { setCurrentPage } = useCurrentPageContext();
  useEffect(() => setCurrentPage("author"));
  return (
    <MyAccardion id="accordionExample">
      <MyAccardionItem id="collapseOne" title="About My Guts :)" isCollapsed={true}>
        <p>Pardon my UI design, but I was created by a fullstack senior developer who is not too much fond of UI development</p>
        <p>He used this tech. stack: React, TypeScript, nodejs, Bootstrap. And deployed me to an AWS EC2 t2.nano cheap instance :(</p>
        <p>He has past experience in React JS and Angular and to upgrade his React skill he created me.</p>
      </MyAccardionItem>
      <MyAccardionItem id="collapseTwo" title="Find me on ..." isCollapsed={true}>
        <p>Author's email is <a href="mailto:mercuriev@gmail.com">mercuriev@gmail.com</a></p>
        <p>My source code is in <a href="https://github.com/info-it-best/math-polynom">his portfolio on github</a></p>
      </MyAccardionItem>
      <MyAccardionItem id="collapseThree" title="Plans" isCollapsed={true}>
        <p>Possible future improvements to be done by IT Best Sp. z o.o. specialists</p>
        <p>igorm provider will call backend services for computations and in general will perform much faster and will have fewer limitations</p>
        <p>The "Kordano Build" goal is planned to be implemented only for igorm provider</p>
      </MyAccardionItem>
      <MyAccardionItem id="collapseFour" title="Tech. stack" isCollapsed={true}>
        <p>Used VITE v4.5.2 to create the project and to benefit from hmr updates</p>
        <p>Used Visual Studio Code v1.85.1 for MACOS</p>
        <p>VS Code extension: "ES7+ React/Redux/React-Native snippets v4.4.3"</p>
        <p>VS Code extension: "React Rename"</p>
        <p>Chrome browser with extension: React Developer Tools</p>
        <p>HTML/CSS/JavaScript/TypeScript/React/GIT/bash/ssh/AWS</p>
        <p>Used nvm to support multiple nodejs versions and used the v20.11.0 LTS</p>
        <p>Used NGINX on the server for routing to static build of the React app</p>
        <p>Planning to run backend in nodejs on the same server routed with NGINX</p>
      </MyAccardionItem>
      <MyAccardionItem id="collapseFive" title="How my pages work" isCollapsed={true}>
        <p>The Home page uses custom hook for global info about current page and top nav controls</p>
        <p>Only 3 pages available. Home is the most complex. Others are more static</p>
        <p>Though the Author page uses some simple custom components for Accordion</p>
        <p>The Home page uses React Hook Form to implement the UI logic</p>
        <p>The mathematical computations are implemented inside MathService</p>
        <p>Another custom hook is implemented, similar to useState except is saves the state of Home form elements in browsers local storage</p>
        <p>To make the Home page code neater the select and radio custom components were implemented</p>
        <p>mathjs provider uses mathjs open sourse library which may work somewhat slowly, so I limited my funtion</p>
        <p>igorm provider is not yet implemented, but this is a planned feature</p>
        <p>The misterious "Kordano Build" goal only works for 3 variables and exponent of 3</p>
      </MyAccardionItem>
    </MyAccardion>
)};

export default AuthorPage;