function Header({ heading, paragraph, linkName, linkUrl = "#" }) {
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <img
                    alt=""
                    className="h-14 w-14 mt-2 -mb-4"
                    src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
                />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">{heading}</h2>
        </div>
    );
}
export default Header;
