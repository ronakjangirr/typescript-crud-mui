import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { AddUserInterface } from "../models/types";
import { CrudService } from "../services/CrudService";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  {
    field: "contact",
    headerName: "Number",
    width: 130,
  },
  {
    field: "checked",
    headerName: "Above 18+",
    width: 130,
  },
  {
    field: "description",
    headerName: "Description",
    description: "This column has a value getter and is not sortable.",
    width: 160,
  },
  { field: "currency", headerName: "Currency", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
];

function Read() {
  const [myData, setMyData] = useState<AddUserInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let response = await CrudService.readUserData();
      setMyData(response.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectionChange=(rowSelectionModel: GridRowSelectionModel)=>{       // rowSelectionModel: [23,45]  it store the index and later through we delete or edit it
    debugger
    setSelectedRows(rowSelectionModel)
  }

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      console.log("No rows selected for deletion");
      return;
    }
  
    try {
      const deletePromises = selectedRows.map(id => CrudService.deleteUser(id.toString()));
      await Promise.all(deletePromises); // Wait for all delete operations to complete
      setSelectedRows([]);
      fetchData(); // Refresh data after deletion
      console.log("Selected rows deleted successfully");
    } catch (error) {
      console.error("Error deleting selected rows:", error);
    }
  };
  
  const handleEdit = () => {
    // Navigate to the edit route with selected row ID as a parameter
    if (selectedRows.length===1) {
      navigate(`/update/${selectedRows}`);
    }else if(selectedRows.length>1){
      alert("Please select only one user")
    }else{
      console.log("Nothing to edit")
    }
  };
  
  return (
    <>
      <Box>
      {isLoading ? (
          <Box component="div">
            <Typography variant="h3" component="h2">
              Please Wait data is loading...
            </Typography>
          </Box>
        ) : myData.length === 0 ? (
          <Box component="div">
            <Typography variant="h5" component="h2">
              No data available
            </Typography>
          </Box>
        ) : (
          <Box component="div">
          <DataGrid
            rows={myData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
          />
          <Button variant="contained" onClick={handleDelete}>Delete</Button>
      <Button variant="contained" onClick={handleEdit}>Edit</Button>
      </Box>
        )}
      </Box>
      {JSON.stringify(myData)}
    </>
  );
}

export default Read;
