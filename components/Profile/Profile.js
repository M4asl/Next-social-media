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
    top: "10%",
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

export default function Profile() {
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
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro fuga a distinctio numquam fugiat reprehenderit esse maiores ipsam laudantium praesentium doloremque iure modi quia quam, labore mollitia maxime architecto corporis eos assumenda aliquam ex sapiente harum! Quod accusantium sapiente, sint at odio nihil deserunt mollitia tempora laborum deleniti iure dicta!
        </Typography>
      </CardContent>
    </Card>
  );
}