import {useEffect} from "react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import SideBar from "../Components";

function Profile() {
    const {id} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error('Error fetching user details');
            }
        } catch (error) {
            console.error('Error during fetchUser:', error);
        }
    }

    return (
        <div>
            <div className="container">
                <SideBar/>
                {user &&
                    <div>Welcome {user.name}!</div>
                }
            </div>
        </div>
    )
}

export default Profile
