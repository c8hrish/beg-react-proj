import React, {Component} from 'react'
import classes from './App.module.css'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import Aux from '../hoc/Aux'
import withClass from '../hoc/withClass'
import AuthContext from '../context/auth-context'

class App extends Component{
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {id:'qqe', name:'Rajesh', age:'18'},
      {id:'wee', name:'Howard', age:19},
      {id:'err', name:'Leonard',  age:20}
    ],
    otherState: 'I am just here for the sake..!',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState( {showPersons: !doesShow} )
  }

  deletePersonHandler = (PersonIndex) => {
    const persons1 = [...this.state.persons]
    persons1.splice(PersonIndex,1)
    this.setState({persons: persons1})
  }

  nameChangedHandler = (event, id) =>{
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id

    })
    const person11 = {...this.state.persons[personIndex]}
    person11.name = event.target.value
    
    const persons22= [...this.state.persons]
    persons22[personIndex]= person11
    
    this.setState((prevState, props) => {
      return {
        persons: persons22,
        changeCounter: prevState.changeCounter + 1
      }
    })
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render(){

    console.log('[App.js] render');

    let persons = null
  
    if (this.state.showPersons){
        persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>
    }

    return (
        <Aux>
          
          <button
          onClick={() => 
            {this.setState({ showCockpit: false })
          }}>Remove Cockpit
          </button>

          <AuthContext.Provider
            value={{
              authenticated: this.state.authenticated,
              login: this.loginHandler
            }}>
            
            {this.state.showCockpit ? (
              <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}/>
              ) : null
            }

            {persons}
          </AuthContext.Provider>
        </Aux>
    )
  }
}

export default withClass(App, classes.App)