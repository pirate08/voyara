import { useParams, useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";
import { DestinationDetails } from "../components/DestinationDetails";
import { useEffect } from "react";

const DestinationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the specific destination data
  const destination = destinations.find((d) => d.id === id);

  // If the user enters a fake slug (e.g., /destinations/mars), send them back
  useEffect(() => {
    if (!destination) {
      navigate("/destinations");
    }
  }, [destination, navigate]);

  if (!destination) return null;

  return (
    <DestinationDetails
      item={destination}
      onBack={() => navigate("/destinations")}
    />
  );
};

export default DestinationDetailsPage;
