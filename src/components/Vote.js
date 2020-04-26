import React,{ Fragment } from "react";
import {Header} from 'semantic-ui-react'

export default function({match}){
    return <Fragment> <Header as="h1" size='huge' dividing textAlign="center" > Would you rather</Header> <div >This is vote page for id: {match.params.id}</div> </Fragment>
}            
