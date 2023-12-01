/* eslint-disable react/prop-types */
import './App.css'
import { useState, useEffect, useRef } from 'react';

//Search component --------------->
// const Search = ({ search, onSearch }) => (
//     <>
//         <label htmlFor="search">Search: </label>
//         <input
//             id="search"
//             type="text"
//             value={search}
//             onChange={onSearch}
//         />
//     </>
// )

//List component ---------------->
const List = ({ list }) => (
    <ul>
        {list.map((item) => (
            <Item key={item.objectID} item={item} />
        ))}
    </ul>
);

//Item component ----------------->
const Item = ({ item }) => (
    <li>
        <span><a href={item.url}>{item.title}</a></span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
    </li>
);

//Reusable Input Component ------->
const InputWithLabel = ({ id, value, type = 'text', onInputChange, isFocused, children }) => {

    const inputRef = useRef();

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])

    return (
        <>
            <label htmlFor={id}>{children}</label>
            &nbsp;
            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
            />
        </>
    )
}

//Custom Hook, state & effect
const useStorageState = (key, initialState) => {
    const [value, setValue] = useState(localStorage.getItem(key) || initialState)

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value, key]
    )

    return [value, setValue]
};

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
    ];

    const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    };

    {/*so, for each (story) check if the story's title includes searchTerm, add toLowerCase so it's not case-sensitive*/ }
    const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <h1>My Hacker Stories</h1>
            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={handleSearch}
            >
                <strong>Search: </strong>
            </InputWithLabel>

            <hr />

            <List list={searchedStories} />
        </div>
    )
}

export default App

//only need return statement if there is other logic within the component beforehand
// return{} if containing JSX, return() otherwise ?
//