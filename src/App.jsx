/* eslint-disable react/prop-types */
import './App.css'
import { useState } from 'react';

//Search component --------------->
const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        //synthetic event
        console.log(e);
        //value of target (here: input HTML element)
        setSearchTerm(e.target.value);
        
        props.onSearch(e);
    }

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange}/>
            <p>Searching for <strong>{searchTerm}</strong></p>
        </div>
    )
}

//List component ---------------->
const List = (props) => (
    <ul>
        {props.list.map((item) => (
            <Item key={item.objectID} item={item} />
        ))}
    </ul>
);

const Item = (props) => (
    <li>
        <span><a href={props.item.url}>{props.item.title}</a></span>
        <span>{props.item.author}</span>
        <span>{props.item.num_comments}</span>
        <span>{props.item.points}</span>
    </li>
);

//Main component --------------->
const App = () => {
    const stories = [
        {
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: 'Redux',
            url: 'https://redux.js.org/',
            author: 'Dan Abramov, Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: 1,
        }
    ]

    const handleSearch = (e) => {
        console.log(e.target.value);
    }

    return (
        <div>
            <h1>My Hacker Stories</h1>
            <Search onSearch={handleSearch} />
            <hr />
            <List list={stories} />
        </div>
    )

    
}

export default App

//only need return statement if there is other logic within the component beforehand
// return{} if containing JSX, return() otherwise ?