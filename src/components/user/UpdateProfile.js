import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, updateProfile } from "../../actions/userActions";
import { toast } from "react-toastify";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector((state) => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result); // Set the preview of the image
                setAvatar(file); // Set the file to state 
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        } else {
            setAvatarPreview("/images/default_avatar.png"); // Reset to default if no file is selected
            setAvatar(null); // Reset avatar state
        }
    };
 
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        if (avatar) {
            formData.append("avatar", avatar); // Only append if avatar is not null
        }
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar); // Set avatar preview from user data
            }
        }

        if (isUpdated) {
            toast('Profile updated successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearUpdateProfile())
            });
            return;
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => dispatch(clearAuthError()) // Correctly call clearAuthError
            });
        }
    }, [user, isUpdated, error, dispatch]);

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
                    <h1 className="mt-2 mb-5">Update Profile</h1>

                    <div className="form-group">
                        <label htmlFor="name_field">Name</label>
                        <input
                            type="text" // Changed from "name" to "text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="avatar_upload">Avatar</label>
                        <div className="d-flex align-items-center">
                            <div>
                                <figure className="avatar mr-3 item-rtl">
                                    <img
                                        src={avatarPreview}
                                        className="rounded-circle"
                                        alt="Avatar Preview"
                                    />
                                </figure>
                            </div>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="avatar"
                                    className="custom-file-input"
                                    id="customFile"
                                    accept="image/*" // Ensures only images can be uploaded
                                    onChange={onChangeAvatar}
                                />
                                <label className="custom-file-label" htmlFor="customFile">
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update</button>
                </form>
            </div>
        </div>
    );
}
