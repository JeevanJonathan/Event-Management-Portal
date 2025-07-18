import VendorCard from "./shared/VendorCard";

const vendors = [
  {
    vendorName: "FloraDecor Events",
    vendorImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmu8343yUmdRr9dpwCmcVCIGdgGXR3_ZA9Fw&s",
    vendorPrice: 15000.0,
    vendorDescription:
      "Specializing in elegant floral arrangements and venue decoration for weddings, corporate events, and private parties.",
  },
  {
    vendorName: "SoundWave DJ Services",
    vendorImage:
      "https://images.unsplash.com/photo-1600102975337-e66752d32557?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGolMjBzZXR8ZW58MHx8MHx8fDA%3D",
    vendorPrice: 12000.0,
    vendorDescription:
      "Professional DJ service providing state-of-the-art sound systems and lighting to keep your guests entertained all night.",
  },
  {
    vendorName: "TasteBuds Catering",
    vendorImage:
      "https://media.istockphoto.com/id/650655146/photo/catering-food-wedding-event-table.jpg?s=612x612&w=0&k=20&c=ATGYgW8bM_559jJ5aUNO4HlJqpkOWUmNNMMflx5kajo=",
    vendorPrice: 25000.0,
    vendorDescription:
      "Offering a diverse menu of delicious cuisines tailored to suit your event, from buffet-style meals to formal dining.",
  },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
        About Us
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg mb-4">
            {" "}
            Welcome to EventEase, your all-in-one platform for seamless event
            planning and management. Whether you're organizing a corporate
            seminar, a college fest, or a personal celebration, EventEase
            simplifies the process from start to finish. Our platform is
            designed to connect organizers, vendors, and attendees through an
            intuitive and efficient system. <br /> <br />
            From vendor selection and registration to attendance tracking and
            feedback management, we provide the tools you need to make every
            event a success. Our mission is to streamline the chaos of event
            planning and help you create memorable experiences with ease and
            confidence.
          </p>
        </div>

        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://www.visionvivaah.com/blog/wp-content/uploads/2019/11/Top-10-Event-Management-Companies-In-India.jpg"
            alt=""
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className="py-7 space-y-8">
        <h1 className="text-slate-800 text-4xl font-bold text-center">
          Some of our Vendors
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor, index) => (
            <VendorCard
              key={index}
              vendorName={vendor.vendorName}
              vendorImage={vendor.vendorImage}
              vendorDescription={vendor.vendorDescription}
              vendorPrice={vendor.vendorPrice}
              about
            />
          ))}
        </div>
      </div>
    </div>
  );
}
