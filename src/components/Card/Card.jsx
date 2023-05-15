import { Tilt } from "react-tilt";

const Card = ({ title, image, link, color }) => {
    return (
        <div className="rounded-xl">
            <Tilt className="flex-1 rounded-xl transition-transform duration-200 ease" options={{ max: 25, scale: 1, speed: 300, easing: "cubic-bezier(1,1,0,0)" }}>
                <div data-type={title} className={`relative ${color} block w-[400px] h-[600px] rounded-xl overflow-hidden cursor-pointer interactable`}>
                    
                    <img className="w-full h-full filter aspect-[1/3] object-cover rounded-xl opacity-60 px-1 py-1 transition-opacity duration-300 ease-in-out hover:opacity-100" src={image} alt={title} />
                </div>
            </Tilt>
            <div class="relative -top-[320px] inset-0 flex items-center justify-center pointer-events-none">
                <h2 class="text-white font-bold text-4xl text-shadow-lg outline px-2 py-1 rounded">{title}</h2>
            </div>
        </div>
    );
};

export default Card;
