import React, {Component} from 'react'
import classes from './App.module.css'
import Person from './Person/Person'

class App extends Component{
  state = {
    persons: [
      {id:'qqe', name:'Rajesh', age:18},
      {id:'wee', name:'Howard', age:19},
      {id:'err', name:'Leonard',  age:20}
    ],
  otherState: 'I am just here for the sake..!',
  showPersons: false
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
    
    this.setState({ persons: persons22 })
  }

  render(){

    let persons = null
    let btnClass = ''
      if (this.state.showPersons){
        persons = (
          <div>
            {
              this.state.persons.map((person,index) =>{
              return <Person 
              click= {()=> this.deletePersonHandler(index)}
              name= {person.name}
              age= {person.age}
              key= {person.id}
              changed= {(event)=> this.nameChangedHandler(event, person.id)} />
              })
            }
          </div>
        )
        btnClass = classes.Red
      }

    let assignedClasses = []
    if (this.state.persons.length <=2){
      assignedClasses.push(classes.red)
    }
    if (this.state.persons.length <=1){
      assignedClasses.push(classes.bold)
    }

    return (

        <div className = {classes.App}>
          
          <h1>Hi, I'm a React App </h1>
          
          <p className = {assignedClasses.join(' ')}>This is really working!</p>
          
          <button 
            className = {btnClass}
            onClick = {this.togglePersonsHandler}>Toggle Persons
          </button>
          
          {persons}

        </div>
      
    )
  }
}

export default App;