import React from 'react';

const coupons = [{title: "Muscleblaze Coupons", image: "./img/muscle.jpg", points: 200},{title: "Muscleblaze Coupons", image: "./img/muscle1.jpg", points: 150}]

const RewardsPage = () => {
  return (
    <div className='h-screen overflow-hidden bg-[#082028]'>
<div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold mb-8">Reward Coupons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {coupons.map((coupon, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img src={coupon.image} alt={coupon.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{coupon.title}</h2>
            <h4 className="text-md font-normal">Points Required: {coupon.points}</h4>
            <button className="bg-green-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600">
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default RewardsPage;
