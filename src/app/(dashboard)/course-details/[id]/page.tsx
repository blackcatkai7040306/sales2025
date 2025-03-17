// MUI Imports
"use client"

import Grid from '@mui/material/Grid'

// Component Imports
import Details from './Details'
import Sidebar from './Sidebar'
import { db } from '../detaildata'
import { useParams } from 'next/navigation'
import { Course } from '@/types/academyTypes'
// Data Imports
// import { getAcademyData } from '@/app/server/actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/academy` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getAcademyData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/academy`)

  if (!res.ok) {
    throw new Error('Failed to fetch academy data')
  }

  return res.json()
} */

const CourseDetailsPage =  () => {
  // Vars
  // const data = await getAcademyData()
  const { id } = useParams();
  const course = db?.courses.find((course: Course) => String(course.id) === id);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <Details course={course} />
      </Grid>
      <Grid item xs={12} md={4}>
        <div className='sticky top-[102px]'>
          <Sidebar content={db?.courseDetails.content} />
        </div>
      </Grid>
    </Grid>
  )
}

export default CourseDetailsPage
