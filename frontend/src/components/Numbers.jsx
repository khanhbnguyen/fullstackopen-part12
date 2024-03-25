import phonebookService from "../services/phonebook"

const Numbers = ({persons, setPersons, newFilter}) => {

    const handleRemoveClick = (person) => {

        if (window.confirm(`Delete ${person.name}?`)) {

            phonebookService
                .remove(person.id)

            const newPersons = persons.filter(originalPerson => originalPerson.id != person.id)
            setPersons(newPersons)
        }        
    }

    const filteredPersons = persons.filter(person => (person.name.toLowerCase()).includes(newFilter.toLowerCase()))
    return (
        <ul>
        {filteredPersons.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => handleRemoveClick(person)} >delete</button></li>)}
        </ul> 
    )
}

export default Numbers