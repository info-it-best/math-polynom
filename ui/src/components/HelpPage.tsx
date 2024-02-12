//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import {useEffect} from 'react'
import { useCurrentPageContext } from '../context/CurrentPageContextProvider';
import MyAlert from './MyAlert';

const HelpPage = () => {
  const { setCurrentPage } = useCurrentPageContext();
  useEffect(() => setCurrentPage("help"))
  return <div className="my-help-page">
    <h1>About Me</h1>
    <p>I am an online mathematical tool that can be used to perform algebra operations on expressions.</p>
    <p>I can calculate for you expressions like <span>(</span>a + b<span>)</span>^2</p>
    <p>The result may look like a^2 + 2*a*b + b^2</p>
    <h1>How can you use me?</h1>
    <p>There are FIVE straightforward steps :)</p>
    <ol>
        <li>Enter list of variable names like a,b</li>
        <li>Select "Exponent" value fron 2 to 5</li>
        <li>Select "Goal" from "Exponent" or "Kordano Build"</li>
        <li>Select "Math provider", mathjs is the default one</li>
        <li>Click/Press Submit button and see the results</li>
    </ol>
    <MyAlert isShown={true} type="success"><p>Result: 2 * a * b + a ^ 2 + b ^ 2</p></MyAlert>
  </div>;
}

export default HelpPage