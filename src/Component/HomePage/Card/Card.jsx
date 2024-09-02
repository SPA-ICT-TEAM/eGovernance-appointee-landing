/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

export const Cards = ({ adviser }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.getAttribute("data-index");
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, parseInt(index)]);
          } else {
            setVisibleCards((prev) =>
              prev.filter((id) => id !== parseInt(index))
            );
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (adviser.length > 0) {
      cardsRef.current.forEach((card) => {
        if (card) observer.observe(card);
      });
    } else {
      setVisibleCards([]);
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    }

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [adviser]);

  const handleCardClick = (slug) => {
    navigate(`/appointee/${slug}`);
  };

  return (
    <div className="">
      {adviser.length === 0 ? (
        <div className="flex flex-col gap-5 justify-center items-center h-64">
          <img src={logo} alt="Logo" className="h-20 w-20" />
          <p className="text-xl text-gray-500">
            No one is currently in this position
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {adviser.map((card, id) => (
            <div
              key={id}
              data-index={id}
              ref={(el) => (cardsRef.current[id] = el)}
              className={`flex h-[350px] flex-col justify-center items-center p-4 rounded-lg transform transition-all duration-500 cursor-pointer bg-white hover:scale-110 ${
                visibleCards.includes(id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${id * 100}ms` }}
              onClick={() => handleCardClick(card.slug)} 
            >
              <div className="w-40 h-[200px] rounded-md overflow-hidden">
                <img 
                  src={card.photo || logo} 
                  alt={card.name} 
                  className="" 
                  onError={(e) => e.target.src = logo} 
                />
              </div>
              <div className="flex w-[300px] flex-wrap gap-6 pt-5 items-center justify-center">
                <h2 className="text-[18px] max-w-[80%] text-center font-bold">{card.name.toUpperCase()}</h2>
                <p className="text-[12px] text-[#71717A]">{card.appointment_title}</p>
              </div>
              <div className="pt-5 flex flex-col">
                <p className="max-w-[300px] text-center text-[#71717A] text-[17px]">
                  {card.appointment_position}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
