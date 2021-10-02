import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import "./myprofile.css";

import { useDispatch } from "react-redux";
import { getmyaddress } from "../../Redux/Actions/UseraddressAction";
import { useHistory } from "react-router";
export const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  const history = useHistory();
  if (user?.user.role === "admin" || user?.user.role === "seller") {
    history.push("/admin");
  }
  useEffect(() => {
    dispatch(getmyaddress());
  }, [dispatch]);
  return (
    <div>
      {user?.user ? (
        <>
          <div className="myprofile">
            <div className="myprofile__ba"></div>
            <div className="myprofile__header">
              <Avatar
                alt={user?.user.name}
                src={user?.user.name.charAt(0)}
                style={{
                  width: "86px",
                  height: "86px",
                  fontSize: "34px",
                  background: "#2d6cdf",
                  boxShadow: " 0 6px #364f6b",
                }}
              />
            </div>

            <div className="myprofile___details">
              <div className="myprofile__userName">
                <h4>Name :</h4>
                <p>{user?.user.name}</p>
              </div>
              <div className="myprofile__userEmail">
                <h4>Email :</h4>
                <p>{user?.user.email}</p>
              </div>
              <div className="myprofile__userCreated">
                <h4>Created At :</h4>
                <p>{user?.user.createdAt}</p>
              </div>
              {/* <div className="myprofile__userMyAdress">
                <h4>All Adress</h4>
                <Grid className container alignItems="stretch" spacing={3}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <Grid container alignItems="stretch" spacing={3}>
                        {address?.adress?.map((address) => (
                          <Grid key={address._id}>{address.address}</Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Grid>
              </div> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="myprofile">
            <div className="myprofile__ba"></div>
            <div className="myprofile__header">
              <Avatar
                style={{
                  width: "86px",
                  height: "86px",
                  fontSize: "34px",
                  background: "#2d6cdf",
                  boxShadow: " 0 6px #364f6b",
                }}
              />
            </div>

            <div className="myprofile___details">
              <div className="myprofile__userName">
                <h4>Name :</h4>
                <p>Guest</p>
              </div>
              <div className="myprofile__userEmail">
                <h4>Email :</h4>
                <p>Guest Email</p>
              </div>
              <div className="myprofile__userCreated">
                <h4>Created At :</h4>
                <p>none</p>
              </div>
              {/* <div className="myprofile__userMyAdress">
                <h4>All Adress</h4>
                <p>--</p>
              </div> */}
            </div>
          </div>
        </>
      )}{" "}
    </div>
  );
};
