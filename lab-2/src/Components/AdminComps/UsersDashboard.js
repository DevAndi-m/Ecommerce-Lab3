import React, { useState, useEffect } from 'react';
import '../css/Users.css';
import placeholderImg from '../placeholderImages/profilePLC.jpg';

function UsersDashboard() {
  const dangerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    </svg>
  )

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    isAdmin: false,
    selectedFile: null 
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
    const newValue = type === 'checkbox' ? checked : value;
    setNewUser({ ...newUser, [name]: newValue });
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

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      userName: newUser.name,
      userEmail: newUser.email,
      userPhoneNum: newUser.phone,
      userPassword: newUser.password,
      userIsAdmin: newUser.isAdmin,
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
        console.log('User created successfully!');
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
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const handleAlert = () => {
    setThrowAlert(!throwAlert);
  }
  
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
          <button className='cancel'>Cancel Changes</button>
          <button type='button' className='delete' onClick={handleAlert}>Delete User</button>
        </div>
      </React.Fragment>
    ) : (
      <div className='defaultInfoContainer'>
        <p>This is the default info container when editing user is false.</p>
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
              <div className='cInput'>
                <label>Is Admin:</label>
                <input type='checkbox' name='isAdmin' checked={newUser.isAdmin} onChange={handleChange} className='createCheck'></input>
              </div>
            </div>
          </div>
          <div className='createUserRight'>
            <div className='inputPic'>
              <img src={placeholderImg}></img>
            </div>
            <div className='profileFind'>
                <h3>Select a profile picture:</h3>
                <div className='profilePicContainer'>
                  <button><img src='https://optimise2.assets-servd.host/maniacal-finch/production/animals/grizzly-bear-01-01.jpg?w=1200&h=1200&auto=compress%2Cformat&fit=crop&dm=1658944720&s=1aa811061c516482fe15273978711bc7'></img></button>
                  <button><img src='https://www.vidavetcare.com/wp-content/uploads/sites/234/2022/04/boxer-dog-breed-info.jpeg'></img></button>
                  <button><img src='https://upload.wikimedia.org/wikipedia/commons/5/55/Spitfire_-_Season_Premiere_Airshow_2018_%28cropped%29.jpg'></img></button>
                  <button><img src='https://hips.hearstapps.com/pop.h-cdn.co/assets/16/48/1600x1200/sd-aspect-1480371374-t-80-tank-engineering-technologies-2010.jpg?resize=1200:*'></img></button>
                  <button><img src='https://images.prismic.io/carwow/65cbb34b-b61c-48af-b34e-5bd785e95a28_2023+Porsche+911+front+quarter+moving.jpg'></img></button>
                  <button><img src='https://www.zeidlers.com/assets/img/dictionary/lily-main.jpg'></img></button>
                  <button><img src='https://www.earth.com/_next/image/?url=https%3A%2F%2Fcff2.earth.com%2Fuploads%2F2023%2F06%2F02100547%2FMountain-2-960x640.jpg&w=3840&q=75'></img></button>
                  <button><img src='https://miro.medium.com/v2/resize:fit:1200/1*TGATqkXS3Y1FVZIC4X-LzA.png'></img></button>
                </div>
                <div className='profileInputPic'>
                  <h3>or add your own:</h3>
                  <input type='url' className='profileUrl'></input>
                </div>
            </div>
            <div className='createUserButtons'>
              <button type='submit' className='createNewUser' onClick={handleCreate}>Create User</button>
              <button className='discardNewUser' onClick={handleDiscard}>Discard User</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UsersDashboard;
