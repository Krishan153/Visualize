import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          console.log(authUser)
          setUser(authUser)

          if (authUser.displayName) {

          } else {
            return authUser.updateProfile({
              displayName: username
            })
          }
        } else {
          setUser(null)
        }
      })

    return () => {
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
    //this will run every single time the db is updated this function runs
  }, [])

  const signUp = (event) => {
    event.preventDefault()
    auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signup">
              <center>
                <img
                  className="app_headerImage"
                  src="https://i.imgur.com/RwK7pg1.png"
                  alt="">
                  </img>
              </center>

                  <Input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}>
                  </Input>
                  <Input
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                  </Input>
                  <Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                  </Input>
                  <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        </Modal>
      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://i.imgur.com/RwK7pg1.png"
          alt="">
        </img>
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      <h1>Testing</h1>
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imgUrl={post.imgUrl}></Post>
        ))
      }
    </div>
  );
}

export default App;
