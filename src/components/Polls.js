import React from "react";

export default function({match}) {
    return <Fragment> <Header as="h1" size='huge' dividing textAlign="center" > Would you rather</Header> <div >This is polls page for id: {match.params.id} </div> </Fragment>
}
