import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



const QuizeList = () => {
    const subjects = [
        { id: 1, name: 'Maths' },
        { id: 2, name: 'evs' },
        { id: 3, name: 'አካባቢ ሳይንስ' },
        { id: 4, name: 'አማርኛ' },
        { id: 5, name: 'English' },
        { id: 6, name: 'Spoken' },
        { id: 7, name: 'ግብረ ገብ' },
        { id: 8, name: 'Music' },
        { id: 9, name: 'HPE' },
        { id: 10, name: 'ሒሳብ' },
        { id: 11, name: 'Computer' },
        // Add more subjects as needed
      ];
  return (

    <div style={{ padding: 20 }}>
    <Grid container spacing={3}>
      {subjects.map((subject) => (
        <Grid item key={subject.id} xs={12} sm={6} md={4} lg={3}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h4" color="common.black">
            <Link to={`/QuizSiglePage/${subject.name}`}>{subject.name}</Link>

            </Typography>
          </Paper>
        </Grid>

      ))}
    </Grid>
    </div>
  )
}

export default QuizeList