import React from 'react';
import NavBar from '../components/navbar/NavBar'
import HydraConsole from '../components/hydra-console/HydraConsole'
import HydraGraph from '../components/hydra-graph/HydraGraph'
import Grid from '@material-ui/core/Grid';
import './app.scss';
import GuiTheme from './gui-theme'
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';

class AgentGUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleWidth: 6, //6 | 12 
      hidden: false, //false | true,
      classes: null,
    }

  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/hydra-doc')
      .then(res => {
        var endpoints = null;
        var classes = null;
        debugger

        this.setState({
          //for this.supportedClass > if @id="vocab:EntryPoint" then supportedProperty.property.labe
          classes: res.data.supportedClass,
        })
        debugger
        console.log(res);
      });
  }


  toggleGraph(){
    if(this.state.hidden){
      this.setState({
        consoleWidth: 6,
        hidden: false
      })
    }else{
      this.setState({
        consoleWidth: 12,
        hidden: true
      })
    }
  }

  render() {
    if(this.state.classes){
      return (
        <ThemeProvider theme={GuiTheme}>
          <NavBar 
            text="Hydra Agent GUI"
            fontSize='1.5em'
            backgroundColor={GuiTheme.palette.primary.main}
            color='primary'
            onClick={() => this.toggleGraph()}>
          </NavBar>
          <Grid container>
            <Grid item hidden={this.state.hidden} md={12 - this.state.consoleWidth} xs={12} > 
              <NavBar text="Hydra API" fontSize='1.3em'
                backgroundColor={GuiTheme.palette.primary.light}
                fontColor="textSecondary"></NavBar>
              <HydraGraph></HydraGraph>
            </Grid>
    
            <Grid item md={this.state.consoleWidth} xs={12} color='primary'>
              <NavBar text="Agent Console" fontSize='1.3em'
                backgroundColor={GuiTheme.palette.primary.dark}
              ></NavBar> 
              <HydraConsole  hydraClasses={this.state.classes} color='primary' ></HydraConsole>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
    }else{
      return "Fetching Hydra API Doc from the Server..."
    }
  }
}

export default AgentGUI;

