import React, { useState, useEffect } from 'react';
import '../css/Users.css';
import placeholderImg from '../placeholderImages/profilePLC.jpg';

function UsersDashboard() {
  const dangerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    </svg>
  )

  const refreshSymbol = (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
    </svg>
  )

  const personSymbol = (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
      <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    </svg>
  )

  const usersSymbol = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
    </svg>
  )

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    isAdmin: false,
    selectedFile: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
  });  

  const [formInputs, setFormInputs] = useState({
    userName: '',
    userEmail: '',
    userPhoneNum: '',
    userPassword: '',
    userIsAdmin: false,
  });
  
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [throwAlert, setThrowAlert] = useState(false);

  const [usernameAvailability, setUsernameAvailability] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);
  const [emailAvailability, setEmailAvailability] = useState(true);


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
  
      setFormInputs({
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPhoneNum: userData.userPhoneNum,
        userPassword: userData.userPassword,
        userIsAdmin: userData.userIsAdmin,
      });

      handleRefresh();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormInputs(prevState => ({ ...prevState, [name]: newValue }));
  };
  
  const handleUpdateUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInputs),
      });
  
      if (response.ok) {
        console.log('User updated successfully!');
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };  
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'profileUrl') {
      setNewUser({ ...newUser, selectedFile: value });
    } else {
      const newValue = type === 'checkbox' ? checked : value;
      setNewUser({ ...newUser, [name]: newValue });
    }
  };
  
  const handleDiscard = (e) => {
    e.preventDefault();
    setNewUser({
      name: '',
      email: '',
      phone: '',
      password: '',
      isAdmin: false,
      selectedFile: null 
    });
  };

  const handleCreate = () => {
    selectedPage(1);
    handleRefresh();
  }

  const checkUsernameAvailability = (username) => {
   setTimeout(() => {
      const isAvailable = !users.find(user => user.userName === username);
      setUsernameAvailability(isAvailable);
    }, 500); 
  };

  const checkEmailValidity = (email) => {
    setTimeout(() => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = email === '' || emailPattern.test(email);
      setEmailValidity(isValid);
    }, 1000)
  };

  const checkEmailAvailability = (email) => {
    setTimeout(() => {
      const isAvailable = !users.find(user => user.userEmail === email);
      setEmailAvailability(isAvailable);
    }, 500); 
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setNewUser(prevState => ({ ...prevState, name: value }));
    checkUsernameAvailability(value);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setNewUser(prevState => ({ ...prevState, email: value }));
    checkEmailValidity(value);
    checkEmailAvailability(value);
  };

  useEffect(() => {
    checkUsernameAvailability(newUser.name);
    checkEmailValidity(newUser.email);
    checkEmailAvailability(newUser.email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      userName: newUser.name,
      userEmail: newUser.email,
      userPhoneNum: newUser.phone,
      userPassword: newUser.password,
      userIsAdmin: newUser.isAdmin,
      userProfile: newUser.selectedFile,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log('User created!');
        setNewUser({
          name: '',
          email: '',
          phone: '',
          password: '',
          isAdmin: false,
          selectedFile: null,
        });

        handleCreate();
        
      } else {
        console.error('Error creating user:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const handleDeleteUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        handleAlert();
        setFormInputs({
          userName: '',
          userEmail: '',
          userPhoneNum: '',
          userPassword: '',
          userIsAdmin: false,
        });
        setEditingUser(null);
      } else {
        console.error('Error deleting user:', response.statusText);
      }

      handleRefresh();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const handleAlert = () => {
    setThrowAlert(!throwAlert);
  }

  const handleImagePaste = (e) => {
    const pastedUrl = e.clipboardData.getData('text');
    setNewUser({ ...newUser, selectedFile: pastedUrl });
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCancelChanges = () => {
    setEditingUser(null);
  };
  
  return (
    <div className='userMainCont'>
      <div className='header'>
        <div className='title'>
          <h1>Users Dashboard</h1>
        </div>
        <div className='dashboardNav'>
          <button className='ulU' onClick={() => selectedPage(1)}>User List/Update</button>
          <button className='cau' onClick={() => selectedPage(2)}>Create a user</button>
        </div>
      </div>
      <div className='bodyContainer'>
        <div className='listContainer'>
          <div className='userSearch'>
            <input className="userSeachInput" type='text' placeholder='search for a specific user'></input>
            <h2 onClick={handleRefresh}>{refreshSymbol}</h2>
            <div className='noUsers'>
              <p>{usersSymbol}</p>
              <p>{users.length}</p>
            </div>
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
        <form>
  <div className='infoContainer'>
    {editingUser ? (
      <React.Fragment>
        <div className='rightMainUserInfo'>
          <div className='rightUserImage'>
            <img src={editingUser.userProfile} className='rightPLCIMG' alt='Profile'></img>
          </div>
          <div className='rightUserTitle'>
            <div className='inpt'>
              <label>Name: </label>
              <input type='text' value={formInputs.userName} onChange={handleInputChange} name='userName' />
            </div>
            <div className='inpt'>
              <label>Email: </label>
              <input type='email' value={formInputs.userEmail} onChange={handleInputChange} name='userEmail' />
            </div>
            <div className='inpt'>
              <label>Phone Num: </label>
              <input type='tel' value={formInputs.userPhoneNum} onChange={handleInputChange} name='userPhoneNum' />
            </div>
          </div>
        </div>
        <div className='rightMoreInfo'>
          <div className='inptMI'>
            <label>Password: </label>
            <input type='password' value={formInputs.userPassword} onChange={handleInputChange} name='userPassword' />
          </div>
          <div className='inptMI'>
            <label>Is Admin: </label>
            <input type='checkbox' checked={formInputs.userIsAdmin} onChange={handleInputChange} name='userIsAdmin' />
          </div>
          <div className='inptMI'>
            <label>Date of Creation: </label>
            <input type='text' value={formatDate(editingUser.userDateOfCreation)} readOnly></input>
          </div>
        </div>
        <div className='rightBtns'>
          <button className='update' onClick={handleUpdateUser}>Confirm Changes</button>
          <button className='cancel' onClick={handleCancelChanges}>Cancel Changes</button>
          <button type='button' className='delete' onClick={handleAlert}>Delete User</button>
        </div>
      </React.Fragment>
    ) : (
      <div className='defaultInfoContainer'>
        <h1>{personSymbol}</h1>
        <h1>Edit User</h1>
        <h3>Please select a user on the left pannel to edit them</h3>
      </div>
    )}
    {/* DELETE ALERT */}
    {throwAlert && (
      <div className='deleteAlert'>
        <h1>{dangerIcon}</h1>
        <p>Are you sure you want to delete "{formInputs.userName}" from the database?</p>
        <div className='delBtnCont'>
          <button type="button" className='trueDelete' onClick={handleDeleteUser}>Delete</button>
          <button type="button" className='cancelDeletion' onClick={handleAlert}>Cancel</button>
        </div>  
      </div>
    )}
  </div>
</form>
      </div>

      {/* CREATE USER CONT */}
      <div className='createUserContainer' style={{ display: 'none' }}>
        <div className='cuTitle'>
          <h1>Create User</h1>
        </div>
        <form className='createUserForm' onSubmit={handleSubmit}>
          <div className='createUserLeft'>
            <div className='cuInputs'>
              <div className='cInput'>
                <label>Name:</label>
                <input type='text' name='name' value={newUser.name} onChange={handleUsernameChange}></input>
              </div>
              {!usernameAvailability && <p className='createError'>Username is taken.</p>}
              <div className='cInput'>
                <label>Email:</label>
                <input type='text' name='email' value={newUser.email} onChange={handleEmailChange}></input>
              </div>
              {!emailValidity && <p>Invalid email format.</p>}
              {!emailAvailability && <p>Email is already registered.</p>}
              <div className='cInput'>
                <label>Phone Number:</label>
                <input type='text' name='phone' value={newUser.phone} onChange={handleChange}></input>
              </div>
              <div className='cInput'>
                <label>Password:</label>
                <input type='text' name='password' value={newUser.password} onChange={handleChange}></input>
              </div>
              <div className='cInput'>
                <label>Is Admin:</label>
                <input type='checkbox' name='isAdmin' checked={newUser.isAdmin} onChange={handleChange} className='createCheck'></input>
              </div>
            </div>
          </div>
          <div className='createUserRight'>
          <div className='inputPic'>
            {newUser.selectedFile && <img src={newUser.selectedFile} alt='Profile'></img>}
          </div>
            <div className='profileFind'>
                <h3>Paste image URL:</h3>
                <div className='profileInputPic'>
                  <input type='url' className='profileUrl' onPaste={handleImagePaste}></input>
                </div>
            </div>
            <div className='createUserButtons'>
              <button type='submit' className='createNewUser'>Create User</button>
              <button className='discardNewUser' onClick={handleDiscard}>Discard User</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UsersDashboard;
