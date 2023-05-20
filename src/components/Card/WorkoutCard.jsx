function WorkoutCard({items}) {
    const renderedWorkout = items.map((item) => {
        return (
          <div className="flex flex-col w-[300px] h-[250px] relative rounded-xl">
            <div className="relative overflow-hidden rounded-[20px] h-[250px] hover:shadow-lg hover:drop-shadow-lg">
              <div className="z-2 relative flex flex-col h-full p-10 bg-gradient-to-b from-[#08232c] to-[#13262c] rounded-10">
                <div className="text-white text-3xl font-bold mb-4">{item.name}</div>
                <div className="text-white">Count: {item.count}</div>
                <div className="text-white">Points: {item.points}</div>
              </div>
            </div>
          </div>
        );
      });
    return(<div className="flex flex-row gap-[60px]">
        {renderedWorkout}
    </div>)
}
export default WorkoutCard;