import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    review:
      "Amazing freelancer! Very professional and delivered the project exactly as expected.",
    rating: 5,
    date: "2 weeks ago",
    image: "/avatars/sarah.jpg",
  },
  {
    name: "Michael Brown",
    role: "Business Owner",
    review:
      "Great communication and excellent attention to detail. Highly recommended!",
    rating: 5,
    date: "1 month ago",
    image: "/avatars/michael.jpg",
  },
];

const ClientReviews = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-5">
        Client Reviews
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">
                      {review.name}
                    </h3>

                    <p className="text-gray-900 text-sm">
                      {review.role}
                    </p>
                  </div>

                  <span className="text-gray-500 text-sm">
                    {review.date}
                  </span>
                </div>

                <div className="flex gap-1 my-3">
                  {[...Array(5)].map((_, index) => (
                    <FiStar
                      key={index}
                      size={16}
                      className={
                        index < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>

                <p className="text-gray-900 text-sm leading-6">
                  {review.review}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientReviews;