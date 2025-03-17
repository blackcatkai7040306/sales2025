// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import { db } from './course'

// Component Imports
import CourseListTable from './CourseListTable'

const CourseList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CourseListTable tableData={db} />
      </Grid>
    </Grid>
  )
}

export default CourseList;
