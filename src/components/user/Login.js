import { Fragment, useEffect, useState } from "react";
import Metadata from "../layouts/MetaData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthError, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        console.log(password)
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect); 
        }

        if (error) {
            toast.error(error, {
                position: 'bottom-center',
                onClose: () => {
                    dispatch(clearAuthError());
                }
            });
        }
    }, [error, isAuthenticated, dispatch, navigate, redirect]);

    return (
        <Fragment>
            <Metadata title={`Login`} />
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                    <center><img src="/Images/logo.svg" width="120" height="95" alt="logo" />
                    <h4 className="mb-3">Hey there!<br/>Welcome back to Iyappaa</h4></center><br/>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group position-relative">
                            <label htmlFor="password_field">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn position-absolute end-0 top-0 mt-2 me-2"
                                    style={{ background: "transparent", border: "none" }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i
    className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
    style={{
        color: "white",
        backgroundColor: "black",
        padding: "5px",
        borderRadius: "50%",
        transform: "translateY(-5px)", // Adjust this value to move it further up or down
    }}
></i>

                                </button>
                            </div>
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
    
                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3 bg-green"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "LOGIN"}
                        </button>

                        <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
