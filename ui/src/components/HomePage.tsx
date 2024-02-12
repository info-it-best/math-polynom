//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCurrentPageContext } from '../context/CurrentPageContextProvider';
import { MathOperationResult, MathProvider, MathResultsData, extractVarNamesFrom, validateVarList } from '../types'
import MathService from '../service/MathService'
import { useStorage } from '../service/storage';
import MyAlert from './MyAlert';
import MySelect from './MySelect';
import MyRadioBox from './MyRadioBox';

type FormFields = {
  varNames: string;
  exp: string;
  op: string;
  mathProvider: MathProvider;
}

const defaultMathResultsData = MathResultsData.buildDefaut();

const defaultFormFields: FormFields = {
  varNames: "",
  exp: "2",
  op: "exponent",
  mathProvider: "mathjs",
}

const HomePage = () => {
  const [formFields, setFormFields] = useStorage("formState", defaultFormFields)
  const [mathResultsData, setMathResultsData] = useStorage("mathResultsData", defaultMathResultsData)
  const { setCurrentPage } = useCurrentPageContext();
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormFields>()
  useEffect(() => setCurrentPage("home"))
  const runComputation = () => {
    // @ts-ignore
    MathService.performOperation({
      ...formFields,
      exp: parseInt(formFields.exp),
      varNames: extractVarNamesFrom(formFields.varNames),
    }).then((result: MathOperationResult) => setMathResultsData(MathResultsData.buildSuccess(result)))
    .catch((error: any) => setMathResultsData(MathResultsData.buildFailure(new Error(error.message))))
  }
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("Form submission", formFields)
    setMathResultsData(MathResultsData.buildLoading())
    setTimeout(runComputation, 100);
  }
  const onChange = (e: any) => {
    const key = e.target.name;
    const newValue = e.target.value;
    // @ts-ignore
    console.log(`Changing ${e.target.name} from ${formFields[key]} to ${newValue}`)
    const newState = {...formFields}
    // @ts-ignore
    newState[key] = newValue;
    setFormFields(newState)
  }
  return <>
    <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("varNames", { validate: validateVarList, onChange })}
        id="varNames"
        className={`form-control form-control-lg ${errors.varNames && "is-invalid"}`} 
        type="text" 
        placeholder="variable names separated w/ commas" 
        aria-label="variable names"
        value={formFields.varNames}
      />
      <label htmlFor="varNames">{errors.varNames ? errors.varNames.message : "List of variable names"}</label>
      <hr/>
      <MySelect 
        id="exp" title="Exponent" formState={formFields} 
        register={register("exp", { onChange })} 
        options={{"2": 2, "3": 3, "4": 4, "5": 5}} />
      <MySelect 
        id="op" title="Goal" formState={formFields} 
        register={register("op", { onChange })} 
        options={{"exponent": "Exponent", "kordano": "Kordano Build"}} />
      <hr/>
      <div className="math-providers-radios">
        <label>Math provider:</label>
        <MyRadioBox id="mathjs" formState={formFields} register={register("mathProvider", { onChange })} />
        <MyRadioBox id="igorm" formState={formFields} register={register("mathProvider", { onChange })} />
      </div>
      <button type="submit" disabled={isSubmitting || mathResultsData.isLoading} className="btn btn-primary">Submit</button>
    </form>
    <MyAlert isShown={mathResultsData.isLoading} type="secondary"><p>Loading...</p></MyAlert>
    <MyAlert isShown={!!mathResultsData.result} type="success">
      <p>Goal: {mathResultsData.result?.goal}</p><p>Loading... {mathResultsData.isLoading}</p>
      <p>Duration: {mathResultsData.result?.duration} ms</p>
    </MyAlert>
    <MyAlert isShown={!!mathResultsData.result} type="success"><p>Result: {mathResultsData.result?.result}</p></MyAlert>
    <MyAlert isShown={!!mathResultsData.error} type="danger"><p>Error: {mathResultsData.error?.message}</p></MyAlert>
  </>;
};

export default HomePage;