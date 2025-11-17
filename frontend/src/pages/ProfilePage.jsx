import { useUser} from "../hooks";

export default function ProfilePage() {
    const {user} = useUser();

    if (!user) return <Loading />;
    return <div>ProfilePage</div>
}