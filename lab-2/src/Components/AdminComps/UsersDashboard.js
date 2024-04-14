import React, { useState, useEffect } from 'react';
import '../css/Users.css';
import placeholderImg from '../placeholderImages/profilePLC.jpg';

function UsersDashboard() {

  const [page, setPage] = useState(1);
  
  useEffect(() => {
    selectedPage(page);
  }, [page]);

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

            {/* Single user card */}
            <div className='userCard'>
              <div className='mainInfo'>
                <div className='userMainInfo'>
                  <div className='userImg'>
                    <img src={placeholderImg}></img>
                  </div>
                  <div className='userTitle'>
                    <h3>Finan Useri</h3>
                    <p>finoo@gmail.com</p>
                  </div>
                </div>
                <div className='userBtn'>
                  <button className='editBtn'>Edit User</button>
                  <button className='delBtn'>Delete User</button>
                </div>
              </div>
              <div className='userInfo'>
                <p className='passwordEl'>Password: 120371094712050912079401831028041280481204-012-4-1858</p>
                <p className='phoneEl'>Phone number:  123112331231</p>
                <p className='dateOfCreation'>Account age: 12 months</p>
                <p className='userId'>User ID: 1231208412904812412841284812379123691286412847812047081286841208748126478912640812743081764087</p>
              </div>
            </div>
            {/* user Card finish */}

            {/* Single user card */}
            <div className='userCard'>
              <div className='mainInfo'>
                <div className='userMainInfo'>
                  <div className='userImg'>
                    <img src={placeholderImg}></img>
                  </div>
                  <div className='userTitle'>
                    <h3>Finan Useri</h3>
                    <p>finoo@gmail.com</p>
                  </div>
                </div>
                <div className='userBtn'>
                  <button className='editBtn'>Edit User</button>
                  <button className='delBtn'>Delete User</button>
                </div>
              </div>
              <div className='userInfo'>
                <p className='passwordEl'>Password: 120371094712050912079401831028041280481204-012-4-1858</p>
                <p className='phoneEl'>Phone number:  123112331231</p>
                <p className='dateOfCreation'>Account age: 12 months</p>
                <p className='userId'>User ID: 1231208412904812412841284812379123691286412847812047081286841208748126478912640812743081764087</p>
              </div>
            </div>
            {/* user Card finish */}

            {/* Single user card */}
            <div className='userCard'>
              <div className='mainInfo'>
                <div className='userMainInfo'>
                  <div className='userImg'>
                    <img src={placeholderImg}></img>
                  </div>
                  <div className='userTitle'>
                    <h3>Finan Useri</h3>
                    <p>finoo@gmail.com</p>
                  </div>
                </div>
                <div className='userBtn'>
                  <button className='editBtn'>Edit User</button>
                  <button className='delBtn'>Delete User</button>
                </div>
              </div>
              <div className='userInfo'>
                <p className='passwordEl'>Password: 120371094712050912079401831028041280481204-012-4-1858</p>
                <p className='phoneEl'>Phone number:  123112331231</p>
                <p className='dateOfCreation'>Account age: 12 months</p>
                <p className='userId'>User ID: 1231208412904812412841284812379123691286412847812047081286841208748126478912640812743081764087</p>
              </div>
            </div>
            {/* user Card finish */}

          </div>
          <div className='infoContainer'>
            <div className='rightMainUserInfo'>
              <div className='rightUserImage'>
                <img src={placeholderImg} className='rightPLCIMG'></img>
              </div>
              <div className='rightUserTitle'>
                <div className='inpt'>
                  <label>Name: </label>
                  <input type='text' value="Filan Misteki"></input>
                </div>
                <div className='inpt'>
                  <label>Email: </label>
                  <input type='email' value=" Filan@mail.com"></input>
                </div>
                <div className='inpt'>
                  <label>Phone Num: </label>
                  <input type='tel' value='5031-3123213-2131'></input>
                </div>
              </div>
            </div>
            <div className='rightMoreInfo'>
              <div className='inptMI'>
                <label>Password: </label>
                <input type='number' value='142341651343413223211233212312313213212132131233123123215234523764537834589245726123540345134451451347562345113451435143'></input>
              </div>
              <div className='inptMI'>
                <label>Phone Num: </label>
                <input type='tel' value='5031-3123213-2131'></input>
              </div>
              <div className='inptMI'>
                <label>Phone Num: </label>
                <input type='tel' value='5031-3123213-2131'></input>
              </div>
            </div>
            <div className='rightBtns'>
              <button className='update'>Confirm Changes</button>
              <button className='cancel'>Cancel Changes</button>
              <button className='delete'>Delete User</button>
              <button className='makeAdmin'>Make Admin</button>
            </div>
          </div>
        </div>
        <div className='createUserContainer' style={{ display: 'none' }}>
          <div className='createUserLeft'>
            <div className='cuTitle'>
              <h1>Create User</h1>
            </div>
            <div className='cuInputs'>
              <div className='cInput'>
                <label>Profile Picture:</label>
                <input type='file'></input>
              </div>
              <div className='cInput'>
                <label>Name:</label>
                <input type='text'></input>
              </div>
              <div className='cInput'>
                <label>Email:</label>
                <input type='text'></input>
              </div>
              <div className='cInput'>
                <label>Phone Number:</label>
                <input type='text'></input>
              </div>
              <div className='cInput'>
                <label>Password:</label>
                <input type='text'></input>
              </div>
            </div>
          </div>
          <div className='createUserRight'>
            <div className='inputPic'>
              <img src={placeholderImg}></img>
            </div>
            <div className='createUserButtons'>
              <button className='createNewUser'>Create User</button>
              <button className='discardNewUser'>Discard User</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UsersDashboard
