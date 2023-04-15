import { useContext, useEffect, useState } from "react";
import Panel from "../components/Friends/Panel";
import Leaderboard from "../components/Friends/Leaderboard";
import SignInAnimation from "../components/Animation/NotSIgnInAnimation";
import { AuthContext } from "../components/auth/auth";
import { doc, setDoc, collection, getDocs, query, where, getDoc } from "firebase/firestore";
import { db } from "../components/auth/Firebase";
import dayjs from "dayjs";
import DateContext from "../context/date";

function FriendsPage() {
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    const [friends, setFriends] = useState([]);
    const { date } = useContext(DateContext);
    useEffect(() => {
        let friendList = [];
        const collectionDate = dayjs(date).format("MMMM,DD");
        const fetchData = async () => {
            try {
                const userRef = collection(db, "users");
                const userDocSnapshot = await getDocs(query(userRef, where("uid", "==", currentUserId)));
                const userDocRef = userDocSnapshot.docs[0].ref;
                const coinCollectionRef = collection(userDocRef, "Friends");
                const friendDocsSnapshot = await getDocs(coinCollectionRef);
                friendDocsSnapshot.forEach(async (doc) => {
                    if (doc.exists()) {
                        const friendDoc = doc.data();
                        const friendPoint = await fetchFriendPoint(friendDoc.uid);
                        friendList = [...friendList, { name: friendDoc.name, points: friendPoint }];
                        setFriends(friendList);
                    } else {
                        console.log("Subdocument does not exist!");
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };

        const fetchFriendPoint = async (friendId) => {
            let friendPoints = 0;
            const friendUser = collection(db, "users");
            const friendDocSnapshot = await getDocs(query(friendUser, where("uid", "==", friendId)));
            const friendDoc = friendDocSnapshot.docs[0].ref;
            if (friendDoc) {
                const friendWwcoin = collection(friendDoc, "WWcoin");
                const friendWwcoinWorkout = doc(friendWwcoin, "workout");
                const friWwcoinWorkCol = collection(friendWwcoinWorkout, collectionDate);
                const fiWwcoinWorkDocsSnap = await getDocs(friWwcoinWorkCol);
                fiWwcoinWorkDocsSnap.forEach(async (doc) => {
                    const friendWorkCoin = doc.data();
                    friendPoints = friendPoints + friendWorkCoin.points;
                });

                const friendWwcoinYoga = doc(friendWwcoin, "yoga");
                const friWwcoinYogaCol = collection(friendWwcoinYoga, collectionDate);
                const fiWwcoinYogaDocsSnap = await getDocs(friWwcoinYogaCol);
                fiWwcoinYogaDocsSnap.forEach(async (doc) => {
                    const friendYogaCoin = doc.data();
                    friendPoints = friendPoints + friendYogaCoin.points;
                });
            }
            return friendPoints;
        };
        fetchData();
    }, []);
    return (
        <div>
            {currentUser ? (
                <div className="overflow-y-auto">
                    <div className="flex lg:flex-row flex-col">
                        <div className="article-section ">
                            <Panel />
                        </div>
                        <div className="article-content article-section flex-1 ">
                            <Leaderboard players={friends} />
                        </div>
                    </div>
                </div>
            ) : (
                <SignInAnimation />
            )}
        </div>
    );
}
export default FriendsPage;
