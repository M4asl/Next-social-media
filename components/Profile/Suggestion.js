import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 230,
    zIndex: 100,
    position: "fixed",
    top: "61%",
    left: "6%",
    color: "#141414",
    borderRadius: "20px",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Suggestion() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="M4asl"
        subheader="Mateusz Masłowiec"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat libero dolores adipisci iure ipsum. Quae tenetur odit laudantium debitis consectetur, nemo ullam, quos unde vitae fuga ex repudiandae fugiat autem cumque aspernatur architecto delectus dolor?
        </Typography>
      </CardContent>
    </Card>
  );
}