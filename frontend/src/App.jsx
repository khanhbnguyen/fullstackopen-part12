import { useState } from 'react'
import { useEffect } from 'react'
import phonebookService from "./services/phonebook"
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [newMessage, setMessage] = useState('')


  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()

    const matchingPersons = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

    if (matchingPersons.length != 0) {
      // Assume first matching person. 
      const matchedPerson = matchingPersons[0]
      if (window.confirm(`${matchedPerson.name} already added to phonebook. Replace old number with new number?`)) {
        phonebookService
            .put(matchedPerson, newNumber)
            .then(response => {
              const newPersons = persons.map(person => person.id != matchedPerson.id ? person : person = response)
              setPersons(newPersons)
              setName('')
              setNumber('')

              setMessage(`${matchedPerson.name}'s number successfully changed!`)
              setTimeout(() => {
                setMessage('')
              }, 5000)
            })
            .catch(error => {
              console.log(`${error.response.data.error}`)
              setMessage(`${error.response.data.error}`)
              setTimeout(() => {
                setMessage('')
              }, 5000)

              if (error.response.status === 404) {
                const newPersons = persons.filter(person => person.id != matchedPerson.id)
                setPersons(newPersons)
                setName('')
                setNumber('')
              }
            })
      }        
    } else {
      const newPerson = {name: newName, number: newNumber}

      phonebookService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setName('')
          setNumber('')

          setMessage(`${newPerson.name} successfully added!`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
        .catch(error => {
          console.log(`${error.response.data.error}`)
          setMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setMessage('')
          }, 5000)

        })
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook (Part 12 vFINAL)</h2>
      <Notification newMessage={newMessage}/>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} setPersons={setPersons} newFilter={newFilter}/>
    </div>
  )
}

export default App