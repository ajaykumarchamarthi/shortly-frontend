import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./../../../store/auth-context";
import AddURLModal from "../../Modal/AddURLModal/AddURLModal";

import classes from "./Profile.module.css";
import axios from "axios";

function Profile({ loading, setLoading }) {
  const [user, setUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const authCtx = useContext(AuthContext);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/users/getAllUsers"
      );
      const { data } = response.data;

      const filteredUser = data.users.filter((user) => user._id === userId);
      setUser(filteredUser);
    };
    loadUsers();
  }, []);

  const openHandler = (e) => {
    e.preventDefault();
    authCtx.isLoggedIn ? setIsOpen(!isOpen) : alert("Please Login");
  };

  return (
    <div>
      <div className={classes.profile}>
        <h4>My Profile</h4>
        {user.map((user) => {
          return (
            <div className={classes.userDetails} key={user._id}>
              <p>
                Name - {user.firstName} {user.lastName}
              </p>
              <p>Email - {user.email}</p>
              <div className={classes.btn}>
                <button onClick={openHandler}>Add a URL</button>
                {authCtx.isLoggedIn && isOpen && (
                  <AddURLModal onConfirm={openHandler} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Profile);
