import { Entry } from "../../types";
import HealthCheck from "./HealthCheckEntry";
import Hospital from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcareEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      console.log("hospital");
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      console.log("occupation");
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      console.log("healthcheck");
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;