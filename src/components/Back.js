import React from 'react'
import {useHistory} from 'react-router'
import { KeyboardReturn,ArrowBack } from '@material-ui/icons';
import './Back.css'

function Back() {
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }
    return (
        <>
        <div className="BackBtn" onClick={goBack}><ArrowBack/>Back</div>
        </>
    )
}

export default Back
