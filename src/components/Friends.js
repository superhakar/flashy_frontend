import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  TextField,
  Paper,
  Button,
} from "@mui/material";
import axios from "../common/AxiosConfig";
import MUIDataTable from "mui-datatables";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useHistory } from "react-router-dom";
import { userLoad } from "../services/AuthServices";
import { notifySuccess, notifyError } from "../actionCreators/NotifyActions";

export const Friends = () => {
  let history = useHistory();
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  const columns_friends = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          console.log(authState.friends[dataIndex].name);
          return authState.friends[dataIndex].name;
        },
      },
    },
  ];
  const handleUpdate = (name,status) => {
    axios
      .post("/users/updateRequest", {
        name,
        status,
      })
      .then((res) => {
        console.log(res);
        dispatch(userLoad());
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
      });
  };
  const columns_requests = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          console.log(authState.requests[dataIndex].name);
          return authState.requests[dataIndex].name;
        },
      },
    },
    {
      name: "Accept",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              <Button variant="outlined" color="success" onClick={() => {handleUpdate(authState.requests[dataIndex].name,true);}}>
                <CheckIcon />
              </Button>
            </>
          );
        },
      },
    },
    {
      name: "Decline",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  handleUpdate(authState.requests[dataIndex].name, false);
                }}
              >
                <ClearIcon />
              </Button>
            </>
          );
        },
      },
    },
  ];

  const [name, setName] = useState("");
  const options_friends = {
    filterType: "checkbox",
    download: false,
    print: false,
    pagination: false,
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
  };

  const options_requests = {
    filterType: "checkbox",
    download: false,
    print: false,
    pagination: false,
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
  };
  const sendRequest = () => {
    axios
      .post("/users/sendRequest", {
        name
      })
      .then((res) => {
        console.log(res);
        dispatch(notifySuccess("Friend Request Sent"));
        dispatch(userLoad());
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
      });
  }
  

  return (
    <>
      <div
        style={{ backgroundColor: "#E9D5DA", overflow: "auto", height: "100%" }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Friends</h1>
        </div>
        <div className="row">
          <div className="col-4" style={{ padding: "5px 25px" }}>
            <Paper elevation={3} style={{ padding: "25px" }}>
              <TextField
                margin="dense"
                id="name"
                label="Friend Name"
                value={name}
                style={{ width: "300px", marginBottom: "15px" }}
                onChange={(e) => setName(e.target.value)}
                variant="standard"
              />
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "#673ab7" }}
                onClick={() => {sendRequest()}}
              >
                Send Request
              </Button>
            </Paper>
          </div>
          <div className="col-4" style={{ padding: "5px 25px" }}>
            <MUIDataTable
              title={"Friends List"}
              data={authState.friends}
              columns={columns_friends}
              options={options_friends}
            />
          </div>
          <div className="col-4" style={{ padding: "5px 25px" }}>
            <MUIDataTable
              title={"Requests List"}
              data={authState.requests}
              columns={columns_requests}
              options={options_requests}
            />
          </div>
        </div>
      </div>
    </>
  );
};
