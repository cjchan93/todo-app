import React from 'react';
import { useState, useEffect } from 'react';

const GRAPHQL_API = 'http://localhost:4000/';

function SearchTodo() {
    const [todoArray, setTodoArray] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchFilter, setSearchFilter] = useState([]);

    //for test
    console.log(todoArray.map(item => item.todo));

    const handleChange = e => {
        setSearchText(e.target.value);
    };

    useEffect(() => {

        const query = `query Query {
      getNotes {
        id
        todo
        status
      }
    }`;

        fetch(GRAPHQL_API, {
            method: 'POST',
            body: JSON.stringify({
                query
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(result => {
            setTodoArray(result.data.getNotes);
        });

    }, []);

    useEffect(() => {
        const results = todoArray.filter(item =>
                item.todo.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(results);
        console.log(results);
    }, [searchText]);

    return (
        <div className={"searchelement"}>
            <div >
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchText}
                    onChange={handleChange}
                />
                <ul>
                    {searchResults.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchTodo

