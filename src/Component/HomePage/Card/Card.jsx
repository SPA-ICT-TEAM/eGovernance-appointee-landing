/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div
          className="grid gap-6 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {adviser.map((card, id) => (
            <div
              key={id}
              data-index={id}
              ref={(el) => (cardsRef.current[id] = el)}
              className={`w-full bg-white rounded-3xl overflow-hidden shadow-lg transform transition-all duration-500 cursor-pointer hover:scale-105 ${
                visibleCards.includes(id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${id * 100}ms` }}
              onClick={() => handleCardClick(card.slug)}
            >
              <div className="p-4">
                <h2 className="text-green-600 text-lg font-semibold">{card.name.toTitleCase()}</h2>
                <p className="text-green-600 text-xs mb-2">{card.appointment_title}</p>
                <div className="rounded-xl p-2 mb-3 border-[2px] border-orange-100">
                  <img 
                    src={card?.photo || logo}
                    alt={card.name}
                    style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                    onError={(e) => {
                      console.log("Error loading image, fallback to logo", e);
                      e.target.src = logo;
                    }}
                  />
                </div>
                <div className="bg-green-600 h-[80px] rounded-xl flex text-center py-3 mb-3 px-5">
                  <p className="text-sm self-center text-white">{card?.appointment_position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;