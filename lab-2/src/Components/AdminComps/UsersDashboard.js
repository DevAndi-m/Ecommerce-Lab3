import React from 'react';
import '../css/Users.css';
import placeholderImg from '../placeholderImages/profilePLC.jpg';

function UsersDashboard() {
  return (
    <div className='userMainCont'>
        <div className='header'>
          <div className='title'>
            <h1>Users Dashboard</h1>
          </div>
          <div className='dashboardNav'>
            <button>User List/Update</button>
            <button>Create a user</button>
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
                  <input type='text' value=" Filan Misteki"></input>
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

            </div>
          </div>
        </div>
    </div>
  )
}

export default UsersDashboard
