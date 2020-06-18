import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType } from './types';

interface OwnState{

}

interface StateProps{

}

interface DispatchProps{

}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;

class App extends Component<Props, OwnState>{
    constructor(props:Props){
        super(props);

    }

    render(){
        
        return (<div></div>);
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps)(App)