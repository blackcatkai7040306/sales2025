// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
// Type Imports



// Component Imports
import UserListTable from './UserListTable'
import {db} from './userdata';
const UserList = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable tableData={db} />
      </Grid>
    </Grid>
  )
}

export default UserList
