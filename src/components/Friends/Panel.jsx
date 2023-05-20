import { useState, useContext, useEffect } from "react";
import DateContext from "../../context/date";
import "./Panel.css";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { doc, setDoc, collection, getDocs, query, where, getDoc, deleteDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { AuthContext } from "../auth/auth";
import { db } from "../../components/auth/Firebase";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";

function Panel() {
    const { date, setDate } = useContext(DateContext);
    const [friend, setFriend] = useState("");
    const [friends, setFriends] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;

    const handleClick = () => {
        const fetchData = async () => {
            try {
                const userRef = collection(db, "users");
                const userDocSnapshot = await getDocs(query(userRef, where("uid", "==", currentUserId)));
                const userDocRef = userDocSnapshot.docs[0].ref;
                const coinCollectionRef = collection(userDocRef, "Friends");
                const itemRef = doc(coinCollectionRef, friend);
                console.log(friend)
                const friendDocRef = doc(db, "users", friend);
                console.log(friendDocRef.path);
                const friendDocSnap = await getDoc(friendDocRef);
                if (friendDocSnap.exists()) {
                    setDoc(itemRef, friendDocSnap.data());
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (friend) {
            fetchData();
        }
        setFriend("");
    };

    const handleChange = (value) => {
        setFriend(value);
    };

    useEffect(() => {
        let newItems = [];
        const fetchData = async () => {
            const userRef = collection(db, "users");
            const userDocSnapshot = await getDocs(query(userRef, where("uid", "==", currentUserId)));
            const userDocRef = userDocSnapshot.docs[0].ref;
            const coinCollectionRef = collection(userDocRef, "Friends");
            const subDocsSnapshot = await getDocs(coinCollectionRef);
            subDocsSnapshot.forEach((doc) => {
                if (doc.exists()) {
                    const subDocData = doc.data();
                    newItems = [...newItems, subDocData];
                } else {
                    console.log("Subdocument does not exist!");
                }
            });
            setFriends(newItems);
            console.log("Here");
        };
        fetchData();
    }, [friend]);

    const handleDelete = async (friendId) => {
        const userRef = collection(db, "users");
        const userDocSnapshot = await getDocs(query(userRef, where("uid", "==", currentUserId)));
        if (!userDocSnapshot.empty) {
            const userDocRef = userDocSnapshot.docs[0].ref;
            const collectionRef = collection(userDocRef, "Friends");
            const subDocsSnapshot = await getDocs(collectionRef);
            subDocsSnapshot.forEach((doc) => {
                const friendDocid = doc._document.data.value.mapValue.fields.uid.stringValue;
                if (friendDocid === friendId) {
                    setFriends(friends.filter((item) => item.uid !== friendId));
                    deleteDoc(doc.ref);
                }
            });
        }
    };
    const renderedFriends = friends.map((item, index) => {
        return (
            <div className="flex flex-row ml-[20%] ">
                <div className="w-[30px] text-xl">{index + 1}</div>
                <div className="text-xl w-[180px]">{item.name}</div>
                <div>
                    <ClearRoundedIcon
                        fontSize="medium"
                        onClick={() => {
                            handleDelete(item.uid);
                        }}
                        className="ml-auto mr-2 interactable "
                    />
                </div>
            </div>
        );
    });

    // console.log(dayjs(date).add(1, "day"));
    return (
        <div className="relative bg_panel text-white">
            <div className="lg:w-[35vw] w-[100vw] h-[50vh] lg:h-[109vh] float-right bg-[#0e252d] overflow-y-auto overflow-x-hidden z-10 box__shadow rounded-xl flex flex-col">
                <div className="font-[800] lg:text-3xl sm:text-2xl text-2xl w-full text-white flex gap-2 justify-center items-center select-none mt-6">Friends</div>
                <div className="flex flex-col h-[500px] mt-8">{renderedFriends}</div>

                <div className="font-[800] lg:text-2xl sm:text-xl text-xl w-full text-white flex gap-2 select-none mt-6 ml-10">Add Friend</div>
                <div className="flex flex-row gap-6 ml-10 mr-auto mt-4">
                    <div>
                        <input
                            onChange={(e) => {
                                handleChange(e.target.value);
                            }}
                            textAlign="center"
                            value={friend}
                            className="bg-gray-100 text-black rounded-md py-2 px-4 text-lg w-80 focus:outline-none focus:ring-2 focus:ring-black"
                            style={{ height: 42, fontSize: 22 }}
                        />
                    </div>
                    <div className="mt-1">
                        <Button onClick={handleClick} size="medium" variant="contained" color="primary" className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
                            Done
                        </Button>
                    </div>
                </div>
                <div className="font-[800] lg:text-2xl sm:text-xl text-xl w-full text-white flex gap-2 select-none ml-10 mt-2">
                    UID:<span className="mt-1 font-[400] lg:text-xl sm:text-lg text-lg text-gray-400 select-text">{currentUserId}</span>
                </div>
            </div>
        </div>
    );
}

export default Panel;
