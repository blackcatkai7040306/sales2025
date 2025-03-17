// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { CourseType} from '@/types/courseTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  userData?: CourseType[]
  setData: (data: CourseType[]) => void
}

type FormValidateType = {
  training: string  
  name: string
  shortcode: string
  level: string
  createon: string
  lessons: string
}

type FormNonValidateType = {
  company: string
  country: string
  contact: string
}

// Vars
const initialData = {
  company: '',
  country: '',
  contact: ''
}

const AddCourseDrawer = (props: Props) => {
  // Props
  const { open, handleClose, userData, setData } = props

  // States
  const [formData, setFormData] = useState<FormNonValidateType>(initialData)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      training: '',
      name: '',
      shortcode: '',
      level: '',
      createon: '',
      lessons: ''
    }
  })

  const onSubmit = (data: FormValidateType) => {
    const newUser: CourseType = {
      id: (userData?.length && userData?.length + 1) || 1,
      training: data.training,
      name: data.name,
      shortcode: data.shortcode,
      level: data.level,
      createdon: data.createon,
      lessons: data.lessons,
    }
    console.log(newUser);
    setData([...(userData ?? []), newUser])
    handleClose()
    setFormData(initialData)
    resetForm({ training : '', name: '', shortcode:'', level:'', createon: '', lessons:''})
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between p-6'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='bx-x text-textPrimary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6'>
          <Controller
            name='training'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Training'
                placeholder='John Doe'
                {...(errors.training && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
           <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='name'
                placeholder='John Doe'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='shortcode'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Shortcode'
                placeholder='johndoe'
                {...(errors.shortcode && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='level'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='level'
                placeholder='johndoe@gmail.com'
                {...(errors.level && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='lessons'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='lessons'
                placeholder='lesson'
                {...(errors.lessons && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          {/* <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-status'
                label='Select Status'
                {...field}
                {...(errors.status && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          /> */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddCourseDrawer;
