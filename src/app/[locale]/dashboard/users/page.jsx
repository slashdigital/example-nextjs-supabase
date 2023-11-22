"use client";

import ContentDrawer from "@/components/dashboard/content/content-drawer";
import ContentTitleBar from "@/components/dashboard/content/content-title-bar";
import { buildQuery } from "@/utils/filter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";
import UserDataDrawer from "./data-drawer";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "avatar_url", headerName: "Avatar", width: 130 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "full_name", headerName: "Full Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "platform_role",
    headerName: "Platform Role",
    type: "string",
    width: 130,
  },
];

export default function UserHome() {
  const supabase = useSupabaseClient();

  const [userProfiles, setProfileUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [queryOptions, setQueryOptions] = useState({
    filterModel: {
      items: [],
      quickFilterExcludeHiddenColumns: true,
      quickFilterValues: [],
    },
  });
  const [editingStatus, setEditingStatus] = useState("nil");

  const onFilterChange = useCallback((filterModel) => {
    console.log(filterModel);
    // Here you save the data you need from the filter model
    setQueryOptions({ filterModel: { ...filterModel } });
  }, []);

  const onUserSaved = useCallback((editingStatus, userInfo, error) => {
    setEditingStatus('nil');
    console.log(userInfo, error);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const query = supabase
        .from("profiles")
        .select(
          "id, updated_at, username, full_name, avatar_url, platform_role, email"
        )
        .range(
          paginationModel.page * paginationModel.pageSize,
          paginationModel.pageSize * (paginationModel.page + 1)
        )
        .order("username");
      const queryFilter = buildQuery(query, queryOptions, [
        "username",
        "email",
        "full_name",
      ]);

      const { data: profiles, error } = await queryFilter;

      if (error) {
        console.log("error", error);
        setErrorMessage(`${error.message}: ${error.details}`);
        setHasErrorMessage(true);
      } else setProfileUsers(profiles);
    };
    fetchUsers();
  }, [supabase, paginationModel.pageSize, paginationModel.page, queryOptions]);

  return (
    <Box>
      <ContentTitleBar title={"User list"}>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent="end"
          alignItems="flex-end"
        >
          <Button variant="outlined" size="small" color="primary" onClick={() => setEditingStatus('create')}>
            <AddIcon /> Add
          </Button>
          <Button variant="outlined" size="small" color="error" disabled>
            <RemoveIcon /> Remove
          </Button>
        </Stack>
      </ContentTitleBar>
      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={userProfiles}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          onFilterModelChange={onFilterChange}
          initialState={{
            pagination: {
              paginationModel: {
                page: paginationModel.page,
                pageSize: paginationModel.pageSize,
              },
            },
          }}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <Snackbar
        open={hasErrorMessage}
        autoHideDuration={6000}
        onClose={() => setHasErrorMessage(false)}
      >
        <Alert
          onClose={() => setHasErrorMessage(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* EDIT or CREATE data drawer */}
      <UserDataDrawer open={["create", "edit"].includes(editingStatus)} editingStatus={editingStatus} onSaved={onUserSaved} ></UserDataDrawer>
    </Box>
  );
}
