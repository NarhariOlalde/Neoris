import React, { useState, useEffect } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Header from "./Header";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState({});
  const [userToSave, setUserToSave] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5005/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      if (!userToSave) return;

      if (userToSave.isNew) {
        // Handle creation
        try {
          const response = await fetch("http://localhost:5005/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userToSave),
          });
          const createdUser = await response.json();
          setUsers((oldUsers) =>
            oldUsers.map((user) => (user._id === userToSave._id ? createdUser : user))
          );
        } catch (error) {
          console.error("Error adding user:", error);
        }
      } else {
        // Handle update
        try {
          await fetch(`http://localhost:5005/users/${userToSave._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userToSave),
          });
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
    };

    saveUser();
  }, [userToSave]);

  const handleAddUser = () => {
    const newUser = {
      _id: Date.now(),  // Temporarily use Date.now() for unique ID
      nombre: "",
      apellido: "",
      edad: 0,
      correo: "",
      sexo: "",
      genero: "",
      localizacion: "",
      empleado: false,
      equipos_empleado: "",
      rol_empleado: "empleado",
      chat_bot: {
        historial_preguntas_respuestas: [],
      },
      isNew: true
    };
    setUsers((oldUsers) => [...oldUsers, newUser]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newUser._id]: { mode: GridRowModes.Edit, fieldToFocus: 'nombre' }
    }));
  };

  const handleEditClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit }
    }));
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View }
    }));
    
    // Find the user being edited
    const updatedUser = users.find(user => user._id === id);
    // Set it to save
    setUserToSave(updatedUser);
  };
  

  const handleDeleteClick = (id) => async () => {
    try {
      await fetch(`http://localhost:5005/users/${id}`, {
        method: "DELETE",
      });
      setUsers((oldUsers) => oldUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    }));
    setUsers((oldUsers) => oldUsers.filter((user) => user._id !== id || !user.isNew));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setUsers((oldUsers) =>
      oldUsers.map((user) => (user._id === newRow._id ? updatedRow : user))
    );
    setUserToSave(updatedRow);
    return updatedRow;
  };
  

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "nombre", headerName: "First Name", width: 150, editable: true },
    { field: "apellido", headerName: "Last Name", width: 150, editable: true },
    { field: "edad", headerName: "Age", width: 100, type: "number", editable: true },
    { field: "correo", headerName: "Email", width: 200, editable: true },
    {
        field: "sexo",
        headerName: "Sex",
        width: 120,
        editable: true,
        renderEditCell: (params) => (
          <Select
            value={params.value}
            onChange={(e) => params.api.setEditCellValue({ id: params.id, field: 'sexo', value: e.target.value })}
            fullWidth
          >
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="F">F</MenuItem>
            <MenuItem value="Prefer not to tell">Prefer not to tell</MenuItem>
          </Select>
        )
      }
      ,
    {
      field: "genero",
      headerName: "Gender",
      width: 150,
      editable: true,
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => params.api.setEditCellValue({ id: params.id, field: 'genero', value: e.target.value })}
          fullWidth
        >
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="F">F</MenuItem>
          <MenuItem value="Prefer not to tell">Prefer not to tell</MenuItem>
        </Select>
      )
    },
    { field: "localizacion", headerName: "Location", width: 150, editable: true },
    {
      field: "empleado",
      headerName: "Employee Status",
      width: 150,
      type: "boolean",
      editable: true,
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => params.api.setEditCellValue({ id: params.id, field: 'empleado', value: e.target.value })}
          fullWidth
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      )
    },
    { field: "equipos_empleado", headerName: "Teams", width: 150, editable: true },
    {
      field: "rol_empleado",
      headerName: "Role",
      width: 150,
      editable: true,
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => params.api.setEditCellValue({ id: params.id, field: 'rol_empleado', value: e.target.value })}
          fullWidth
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="empleado">Empleado</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          onClick={handleSaveClick(id)}
          disabled={rowModesModel[id]?.mode !== GridRowModes.Edit}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          onClick={handleCancelClick(id)}
          disabled={rowModesModel[id]?.mode !== GridRowModes.Edit}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick(id)}
          disabled={rowModesModel[id]?.mode === GridRowModes.Edit}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
        />,
      ],
    },
  ];

  return (
    <Box m="20px"
      style={{ with: '50%'}}
    >
      <Header title="User Tables" subtitle="Manage all users" />
      <Button
        startIcon={<AddIcon />}
        onClick={handleAddUser}
        variant="contained"
        color="primary"
        style={{ marginBottom: 20 }}
      >
        Add User
      </Button>
      <Box style={{ height: 600, width: '100%' }}>
        <DataGrid
            rows={users}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50, 100]}
            loading={loading}
            getRowId={(row) => row._id}
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default UserTable;
