import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = useSelector((state,action)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(user)
    return (  
          <>
          <div className="nav__Wrapper">
            <div className="logo">
                <h2>Scheduley</h2>
            </div>
            <div className="user__details">
                <img src='' alt="" />
            </div>
          </div>
          </>
    );
}
 
export default Navbar;