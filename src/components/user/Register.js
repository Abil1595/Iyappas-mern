import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [passwordError, setPasswordError] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated, otpSent } = useSelector(state => state.authState);

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const file = e.target.files && e.target.files[0];
            
            // Check if a file is selected
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(file);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                console.error("No file selected or file type not supported");
            }
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
    
            // Check password validity
            if (e.target.name === 'password') {
                validatePassword(e.target.value);
            }
        }
    };
    
    const validatePassword = (password) => {
        // Define your validation rules
        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
        
        if (!passRegex.test(password)) {
            setPasswordError("Password must be 6-20 characters long and include at least one uppercase, one lowercase letter, one digit, and one special character.");
        } else {
            setPasswordError("");
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // Check password requirements before dispatch
        if (passwordError) {
            toast.error(passwordError, { position: 'bottom-center' });
            return;
        }

        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', avatar);
        dispatch(register(formData));
    };

    useEffect(() => {
        if (otpSent) {
            toast.success("OTP sent to your email!", { position: 'bottom-center' });
            navigate('/verify-otp', { state: { email: userData.email } });
        }
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            toast.error(error, {
                position: 'bottom-center',
                onClose: () => dispatch(clearAuthError())
            });
        }
    }, [otpSent, isAuthenticated, error, dispatch, navigate, userData.email]);

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                <center><img src="/Images/logo.svg" width="120" height="95" alt="logo" />
                    <h3 className="mb-3">Hey there!<br/>Register as a customer</h3></center>

                    <div className="form-group">
                        <label htmlFor="name_field">Name</label>
                        <input
                            name='name'
                            onChange={onChange}
                            type="text"
                            id="name_field"
                            className="form-control"
                            value={userData.name}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            name='email'
                            onChange={onChange}
                            className="form-control"
                            value={userData.email}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <div className="position-relative">
                            <input
                                name='password'
                                onChange={onChange}
                                type={showPassword ? "text" : "password"}
                                id="password_field"
                                className="form-control"
                                value={userData.password}
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
                                        transform: "translateY(-5px)",
                                    }}
                                ></i>
                            </button>
                        </div>
                        {passwordError && <small className="text-danger">{passwordError}</small>}
                    </div>

                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src={avatarPreview}
                                    className='rounded-circle'
                                    alt='Avatar'
                                />
                            </figure>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    onChange={onChange}
                                    className='custom-file-input'
                                    id='customFile'
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
