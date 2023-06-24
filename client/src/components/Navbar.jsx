import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../features/user/userSlice";

const Navbar = () => {
    const {user} = useSelector((state,action)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (  
          <>
          <div className="nav__wrapper">
            <div className="logo">
                <h2>Scheduley</h2>
            </div>
            <div className="user__details">
                <img src={`http://localhost:5000/assets/${user.picturePath}`} alt={user.name} width={50} height={50} style={{borderRadius:"50%",objectFit:"cover"}} />
                <h4>{user.name}</h4> | <h5>{user.email}</h5>
                <button onClick={()=>{ dispatch(setLogout()); navigate('/login')}}>Logout</button>
            </div>
          </div>
          </>
    );
}
 
export default Navbar;