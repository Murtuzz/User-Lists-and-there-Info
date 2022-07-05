import { useEffect, useState } from 'react';
import axios from "axios";
import User from './components/user';
import './App.css';

function App() {
  const API_LINK = 'https://jsonplaceholder.typicode.com/users';
  
  /**
   * @type {Array}
   * @description Array of users
   * @use to store all users from API response
   */
  const [users, setUsers] = useState([])
  
  /**
   * @type {string}
   * @description Search query
   * @use to store search value
   */
  const [search, setSearch] = useState('')
  
  /**
   * @type {Array}
   * @description Array of users filtered by search query
   * @use to store filtered users
   */
  const [searchResult, setSearchResult] = useState([])

  /**
   * @type {async function}
   * @description Function to fetch users from API
   * @working Fetching the users and storing it to users and searchResult 
   */
  const getUsers = async () => {
    try {
      const response = await axios.get(API_LINK)
      setUsers(response.data)   // to have all users data in an array
      setSearchResult(response.data)  // initial value of searchResult is same as users
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 
   * @param {*} e event
   * @description Function to filter users by search query
   * @working Filtering the users and storing it to searchResult
   */
  const handleChange = (e) => {
    const searchValue = e.target.value  // to get the value of search query
    setSearch(searchValue)  // to set the value of search query
    const result = users.filter(user => {
                       // to filter the users based on search query by email or username
                      if (user.email.toLowerCase().includes(searchValue.toLowerCase()) 
                          || user.username.toLowerCase().includes(searchValue.toLowerCase())) {
                        return user
                      }
                    }
                  )
    setSearchResult(result) // to set the filtered users to searchResult
  }

  // to fetch users on component mount
  useEffect(() => {
    getUsers()
  }, [])

  if(users) {
    return (
      <div className="App">
        <h1>Users</h1>
        <div className="search">
          <input type="text" value={search} placeholder="Search" onChange={handleChange}/>
        </div>
        <div className="users">
          { searchResult.map( (user) => <User key={user.id} user = {user}/>) }
        </div>
      </div>
    )
  } else{
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    )
  }
}
export default App;