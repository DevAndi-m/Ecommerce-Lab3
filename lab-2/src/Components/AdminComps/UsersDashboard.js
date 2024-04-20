import React, { useState, useEffect } from 'react';
import '../css/Users.css';
import placeholderImg from '../placeholderImages/profilePLC.jpg';

function UsersDashboard() {

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    selectedPage(page);
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const selectedPage = (pageNum) => {
    const buttonPageOne = document.getElementsByClassName('ulU')[0];
    const buttonPageTwo = document.getElementsByClassName('cau')[0];
    
    const pageOne = document.getElementsByClassName('bodyContainer')[0];
    const pageTwo = document.getElementsByClassName('createUserContainer')[0];
  
    if (pageNum === 1) {
      buttonPageOne.style.textDecoration = "underline";
      buttonPageTwo.style.textDecoration = "none";
      pageOne.style.display = "flex";
      pageTwo.style.display = "none";
    } else {
      buttonPageOne.style.textDecoration = "none";
      buttonPageTwo.style.textDecoration = "underline";
      pageOne.style.display = "none";
      pageTwo.style.display = "flex";
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return formattedDate;
  };

  const handleEditUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      const userData = await response.json();
      setEditingUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        // Optionally, handle success
        console.log('User created successfully');
        // Reset the form after successful submission
        setNewUser({
          name: '',
          email: '',
          phone: '',
          password: ''
        });
      } else {
        // Handle error
        console.error('Failed to create user:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <div className='userMainCont'>
        <div className='header'>
          <div className='title'>
            <h1>Users Dashboard</h1>
          </div>
          <div className='dashboardNav'>
            <button className='ulU' onClick={() => selectedPage(1)}>User List/Update</button>
            <button className='cau'onClick={() => selectedPage(2)}>Create a user</button>
          </div>
        </div>
        <div className='bodyContainer'>
          <div className='listContainer'>
            <div className='userSearch'>
              <input className="userSeachInput" type='text' placeholder='search for a specific user'></input>
            </div>
            {users.map(user => (
            <div key={user._id} className='userCard'>
              <div className='mainInfo'>
                <div className='userMainInfo'>
                  <div className='userImg'>
                    <img src={user.userProfile || placeholderImg} alt='Profile'></img>
                  </div>
                  <div className='userTitle'>
                    <h3>{user.userName}</h3>
                    <p>{user.userEmail}</p>
                  </div>
                </div>
                <div className='userBtn'>
                  <button className='editBtn' onClick={() => handleEditUser(user._id)}>Edit User</button>
                  <button className='delBtn'>Delete User</button>
                </div>
              </div>
              <div className='userInfo'>
                <p className='passwordEl'>Password: {user.userPassword}</p>
                <p className='phoneEl'>Phone number: {user.userPhoneNum}</p>
                <p className='dateOfCreation'>Account created at: {formatDate(user.userDateOfCreation)}</p>
                <p className='userId'>User ID: {user._id}</p>
              </div>
            </div>
          ))}
          </div>
          <div className='infoContainer'>
          {editingUser && (
            <div className='rightMainUserInfo'>
              <div className='rightUserImage'>
                <img src={editingUser.userProfile} className='rightPLCIMG' alt='Profile'></img>
              </div>
              <div className='rightUserTitle'>
                <div className='inpt'>
                  <label>Name: </label>
                  <input type='text' value={editingUser.userName}></input>
                </div>
                <div className='inpt'>
                  <label>Email: </label>
                  <input type='email' value={editingUser.userEmail}></input>
                </div>
                <div className='inpt'>
                  <label>Phone Num: </label>
                  <input type='tel' value={editingUser.userPhoneNum}></input>
                </div>
              </div>
            </div>
          )}
          {/* More user info */}
          {editingUser && (
            <div className='rightMoreInfo'>
              <div className='inptMI'>
                <label>Password: </label>
                <input type='password' value={editingUser.userPassword}></input>
              </div>
              <div className='inptMI'>
                <label>Is Admin: </label>
                <input type='checkbox' checked={editingUser.userIsAdmin}></input>
              </div>
              <div className='inptMI'>
                <label>Date of Creation: </label>
                <input type='text' value={formatDate(editingUser.userDateOfCreation)} readOnly></input>
              </div>
            </div>
          )}
            <div className='rightBtns'>
              <button className='update'>Confirm Changes</button>
              <button className='cancel'>Cancel Changes</button>
              <button className='delete'>Delete User</button>
              <button className='makeAdmin'>Make Admin</button>
            </div>
          </div>
        </div>
        <div className='createUserContainer' style={{ display: 'none' }}>
          <div className='cuTitle'>
            <h1>Create User</h1>
          </div>
          <form className='createUserForm' onSubmit={handleSubmit}>
            <div className='createUserLeft'>
              <div className='cuInputs'>
                <div className='cInput'>
                  <label>Name:</label>
                  <input type='text' name='name' value={newUser.name} onChange={handleChange}></input>
                </div>
                <div className='cInput'>
                  <label>Email:</label>
                  <input type='text' name='email' value={newUser.email} onChange={handleChange}></input>
                </div>
                <div className='cInput'>
                  <label>Phone Number:</label>
                  <input type='text' name='phone' value={newUser.phone} onChange={handleChange}></input>
                </div>
                <div className='cInput'>
                  <label>Password:</label>
                  <input type='text' name='password' value={newUser.password} onChange={handleChange}></input>
                </div>
              </div>
            </div>
            <div className='createUserRight'>
              <div className='inputPic'>
                <img src={placeholderImg}></img>
              </div>
              <div className='createUserButtons'>
                  <button type='submit' className='createNewUser'>Create User</button>
                  <button className='discardNewUser'>Discard User</button>
              </div>
            </div>
          </form>
    </div>
    </div>
  )
}

export default UsersDashboard
