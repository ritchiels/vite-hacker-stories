export const Search = () => {
    const handleChange = (e) => {
        //synthetic event
        console.log(e);
        //value of target (here: input HTML element)
        console.log(e.target.value);
    }

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange}/>
        </div>
    )
}
