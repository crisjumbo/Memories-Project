import React from 'react';
import { useSelector } from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core'

import Post from './Post/Post';
import useStyles from './styles';


 const Posts = ({ setCurrentId }: any) => {
     const posts = useSelector((state: any) => state.posts)
     const classes = useStyles();
     
     console.log(posts)
    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post:any) => (
                    <Grid key={post._id} item xs={12} sm={6} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )

    )
};  

export default Posts;
