import './searchForm.scss';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';

const SearchForm=()=>{
    const {error, loading, getCharByName, clearError}=useMarvelService();
    const [char,setChar]=useState(null)

    const onCharLoaded=(char)=>{
        setChar(char)
    }

    const onUpdateChar=(name)=>{
        clearError()

        getCharByName(name).then(onCharLoaded)
    }

    const errorMessage=error?<div className="form__critical-error"><ErrorMessage/></div>:null

    const result= !char? null:char.length>0?
    <div className="form__search-wrapper">
        <div className="form__success">There is! Visit {char[0].name} page?</div>
        <Link to={`characters/${char[0].id}`} 
              className="button button__secondary">
            <div className="inner">Find</div>
        </Link>
    </div>:
    <div className="form__error">
        The character was not found. Check the name and try again
    </div>;
    
    return(
        <div className="form__container">
            <Formik 
            initialValues={{name:''}}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required!')
            })}
            onSubmit={({name})=>{
                onUpdateChar(name)
            }}>
                <Form>
                    <p className="form__title">Or find a character by name:</p>
                    <div className="form__search-wrapper">
                        <Field placeholder='Enter name'
                        id="name"
                        name="name"
                        type='text'/>
                        <button type='submit' className="button button__main" disabled={loading}>
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component='div' name='name' className='form__error'/>
                </Form>
            </Formik>
            {result}
            {errorMessage}
        </div>
        

    )
}

export default SearchForm;