import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/Navbar.js';
import { BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import { Home } from './screens/Home.js';
import { Profile } from './screens/Profile.js';
import { Login } from './screens/Login.js';
import { Signup } from './screens/Signup.js';
import { CreatePost } from './screens/CreatePost.js';
import { reducers,initialState } from './reducers/useReducers.js';
import { createContext,useContext,useEffect,useReducer,useNavigate } from 'react';
import { UserProvider, useConsumer } from './reducers/userContext.js';
import { ProtectedComponent } from './reducers/ProtectedComponent.js';
import { UserProfile } from './screens/UserProfile.js';

function App() {
  const {user}=useConsumer();
  // const [state,dispatch]=useReducer(reducers,initialState);
  return (
    <div className="App">
      
      <Navbar/>
       <Routes>
       <Route path="/" exact element={
       <Home/>
       }
        />
       <Route path="/login" element={
       user?<Navigate to="/"/>:<Login/>
       } />
       <Route path="/signup"  element={ user?<Navigate to="/"/>:<Signup/>
       }/>
       <Route exact path="/profile" element={
        <ProtectedComponent>
       <Profile/>
       </ProtectedComponent>
       } />
       <Route path="/create-post" element={
       <ProtectedComponent>
       <CreatePost/>
       </ProtectedComponent>
       } />


        <Route path="/profile/:userid" element={
       <ProtectedComponent>
       <UserProfile/>
       </ProtectedComponent>
       } />

       






       
      </Routes>
       
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
