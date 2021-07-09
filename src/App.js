
import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table'


function App() {
  const url = "http://localhost:4000/employee"
  const [data, setData] = useState([])
  useEffect(() => {
    getemployee()
  }, [])

  const getemployee = () => {
    fetch(url).then(resp => resp.json())
      .then(resp => setData(resp))
  }
  const columns = [
    { title: "Name", field: "name", validate: rowData => rowData.name === undefined || rowData.name === "" ? "Required" : true },
    {
      title: "UserName", field: "username",
      validate: rowData => rowData.username === undefined || rowData.username === "" ? "Required" : true
    },
    {
      title: "Email", field: "email",
      validate: rowData => rowData.email === undefined || rowData.email === "" ? "Required" : true
    },
    {
      title: "Phone", field: 'phone',
      validate: rowData => rowData.phone === undefined || rowData.phone === "" ? "Required" : true
    },
    {
      title: "Website", field: "website",
      validate: rowData => rowData.website === undefined || rowData.website === "" ? "Required" : true
    }]
  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      
      <MaterialTable
        title="Employee Details"
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url, {
              method: "POST",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getemployee()
                resolve()
              })
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "PUT",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getemployee()
                resolve()
              })
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "DELETE",
              headers: {
                'Content-type': "application/json"
              },

            }).then(resp => resp.json())
              .then(resp => {
                getemployee()
                resolve()
              })
          })
        }}
      />
    </div>
  );
}

export default App;